from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright
import json, os

ROOT = Path(__file__).resolve().parent
ARTIFACTS = ROOT / "artifacts" / "responsive"
ARTIFACTS.mkdir(parents=True, exist_ok=True)
RESULTS = []

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(("127.0.0.1", 0), QuietHandler)
Thread(target=server.serve_forever, daemon=True).start()
base_url = "http://127.0.0.1:" + str(server.server_port)

def record(name, ok, detail=""):
    RESULTS.append({"test": name, "ok": bool(ok), "detail": str(detail)})
    print(("PASS" if ok else "FAIL") + " | " + name + (": " + str(detail) if detail else ""))
    if not ok:
        raise AssertionError(name + ": " + str(detail))

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1366, "height": 900}, device_scale_factor=1)
        page = context.new_page()
        page_errors = []
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.route("https://**/*", lambda route: route.abort())
        page.add_init_script("""
          localStorage.setItem('esquinaMixFavorites', '{invalid-json');
          localStorage.setItem('esquinaMixCart', JSON.stringify({'48': 999, '999': 2}));
          localStorage.setItem('esquinaMixRole', 'UNTRUSTED_ROLE');
        """)
        page.goto(base_url + "/index.html", wait_until="domcontentloaded")
        record("Age Gate is shown before access", page.locator("#ageGate").is_visible())
        record("Site content remains inert before age confirmation", page.locator(".site-shell").evaluate("(el) => el.hasAttribute('inert')"))
        page.locator("#ageConfirm").click()
        page.wait_for_timeout(380)
        if page.locator("#locationOnboarding").is_visible():
            page.locator("#locationSkipButton").click()
        page.wait_for_timeout(220)
        record("Age Gate unlocks after explicit confirmation", page.locator("#ageGate").is_hidden())
        record("Corrupt favorites storage does not crash the app", len(page_errors) == 0, page_errors)
        record("Invalid persisted role falls back to guest", page.locator("#drawerRole").inner_text() == "GUEST", page.locator("#drawerRole").inner_text())
        record("Persisted cart quantity is clamped to available stock", page.locator("#cartCount").inner_text() == "4", page.locator("#cartCount").inner_text())
        record("Catalog renders all 48 products", page.locator(".product-card").count() == 48, page.locator(".product-card").count())

        page.locator("#catalogSearch").fill("energetico")
        record("Search ignores Portuguese diacritics", page.locator(".product-card").count() == 4, page.locator(".product-card").count())
        page.locator("#catalogSearch").fill("")
        page.locator("#categoryFilters [data-category='Gelo']").click()
        record("Category filter isolates ice products", page.locator(".product-card").count() == 3, page.locator(".product-card").count())
        page.locator("#categoryFilters [data-category='Todos']").click()

        page.evaluate("window.EsquinaMix.setRole('CLIENTE')")
        page.locator("[data-add='4']").click()
        record("Add-to-cart updates quantity", page.locator("#cartCount").inner_text() == "5", page.locator("#cartCount").inner_text())
        page.locator("#cartButton").click()
        record("Cart drawer opens accessibly", page.locator("#cartDrawer").get_attribute("aria-hidden") == "false")
        page.locator("[data-cart-inc='48']").click()
        record("Cart increment respects stock ceiling", page.locator("[data-cart-item='48'] .qty-value").inner_text() == "4")
        page.locator("#cartClose").click()
        page.wait_for_timeout(300)

        page.locator("#menuTrigger").click()
        record("Navigation drawer opens", page.locator("#drawer").get_attribute("aria-hidden") == "false")
        page.locator("#drawerClose").click()
        page.wait_for_timeout(300)
        record("Navigation drawer closes", page.locator("#drawer").get_attribute("aria-hidden") == "true")
        page.locator("#chatLauncher").click()
        record("Chat panel opens", page.locator("#chatPanel").is_visible())
        page.locator("#chatClose").click()
        record("Chat panel closes", page.locator("#chatPanel").is_hidden())

        for width, height in [(320, 740), (360, 800), (375, 812), (390, 844), (430, 932), (768, 1024), (1024, 768), (1366, 768), (1920, 1080)]:
            page.set_viewport_size({"width": width, "height": height})
            page.wait_for_timeout(120)
            metrics = page.evaluate("""() => ({
              viewport: document.documentElement.clientWidth,
              document: document.documentElement.scrollWidth,
              body: document.body.scrollWidth,
              productCards: document.querySelectorAll('.product-card').length
            })""")
            ok = metrics["document"] <= metrics["viewport"] + 1 and metrics["body"] <= metrics["viewport"] + 1
            record("Responsive layout " + str(width) + "x" + str(height) + " has no horizontal overflow", ok, metrics)
            page.screenshot(path=str(ARTIFACTS / (str(width) + "x" + str(height) + ".png")), full_page=False)

        record("No uncaught browser JavaScript errors", len(page_errors) == 0, page_errors)
        browser.close()
finally:
    server.shutdown()

(ROOT / "AUDIT-browser.json").write_text(json.dumps(RESULTS, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(RESULTS, ensure_ascii=False, indent=2))
