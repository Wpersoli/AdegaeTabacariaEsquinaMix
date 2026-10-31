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
          window.__openedUrls = [];
          window.open = (url) => { window.__openedUrls.push(String(url)); return {}; };
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
        record("Search ignores Portuguese diacritics", page.locator(".product-card").count() == 5, page.locator(".product-card").count())
        page.locator("#catalogSearch").fill("")
        page.locator("#categoryFilters [data-category='Gelo']").click()
        record("Category filter isolates ice products", page.locator(".product-card").count() == 3, page.locator(".product-card").count())
        page.locator("#categoryFilters [data-category='Todos']").click()

        page.evaluate("window.EsquinaMix.setRole('CLIENTE')")
        page.locator("[data-add='4']").click()
        record("Add-to-cart updates quantity", page.locator("#cartCount").inner_text() == "5", page.locator("#cartCount").inner_text())
        record("Add-to-cart opens the cart drawer accessibly", page.locator("#cartDrawer").get_attribute("aria-hidden") == "false")
        page.locator("[data-cart-inc='48']").click()
        record("Cart increment respects stock ceiling", page.locator("[data-cart-item='48'] .qty-value").inner_text() == "4")
        page.locator('#checkoutButton').click()
        checkout_url = page.evaluate('window.__openedUrls[0] || ""')
        record('Checkout generates a WhatsApp order summary', 'https://wa.me/' in checkout_url and 'Subtotal' in checkout_url, checkout_url[:180])
        page.locator("#cartClose").click()
        page.wait_for_timeout(300)
        page.locator("#cartButton").click()
        record("Header cart button opens the drawer", page.locator("#cartDrawer").get_attribute("aria-hidden") == "false")
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
        android_context = browser.new_context(viewport={"width": 393, "height": 873}, device_scale_factor=3, is_mobile=True, has_touch=True)
        android_page = android_context.new_page()
        android_errors = []
        android_page.on("pageerror", lambda error: android_errors.append(str(error)))
        android_page.route("https://**/*", lambda route: route.abort())
        android_page.goto(base_url + "/index.html", wait_until="domcontentloaded")
        android_page.locator("#ageConfirm").click()
        android_page.wait_for_timeout(380)
        if android_page.locator("#locationOnboarding").is_visible():
            android_page.locator("#locationSkipButton").click()
        android_page.wait_for_timeout(180)
        android_metrics = android_page.evaluate("({viewport:document.documentElement.clientWidth,document:document.documentElement.scrollWidth})")
        record("Android touch viewport has no horizontal overflow", android_metrics["document"] <= android_metrics["viewport"] + 1, android_metrics)
        android_page.locator("#menuTrigger").click()
        record("Android touch navigation opens", android_page.locator("#drawer").get_attribute("aria-hidden") == "false")
        record("Android emulation has no uncaught JavaScript errors", len(android_errors) == 0, android_errors)
        android_page.screenshot(path=str(ARTIFACTS / "android-chromium-393x873.png"), full_page=False)
        android_context.close()

        webkit = p.webkit.launch(headless=True)
        ios_context = webkit.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=3, is_mobile=True, has_touch=True)
        ios_page = ios_context.new_page()
        ios_errors = []
        ios_page.on("pageerror", lambda error: ios_errors.append(str(error)))
        ios_page.route("https://**/*", lambda route: route.abort())
        ios_page.goto(base_url + "/index.html", wait_until="domcontentloaded")
        ios_page.locator("#ageConfirm").click()
        ios_page.wait_for_timeout(380)
        if ios_page.locator("#locationOnboarding").is_visible():
            ios_page.locator("#locationSkipButton").click()
        ios_page.wait_for_timeout(180)
        ios_metrics = ios_page.evaluate("({viewport:document.documentElement.clientWidth,document:document.documentElement.scrollWidth})")
        record("iOS Safari WebKit viewport has no horizontal overflow", ios_metrics["document"] <= ios_metrics["viewport"] + 1, ios_metrics)
        ios_page.locator("#menuTrigger").click()
        record("iOS Safari WebKit navigation opens", ios_page.locator("#drawer").get_attribute("aria-hidden") == "false")
        record("iOS WebKit emulation has no uncaught JavaScript errors", len(ios_errors) == 0, ios_errors)
        ios_page.screenshot(path=str(ARTIFACTS / "ios-webkit-390x844.png"), full_page=False)
        ios_context.close()
        webkit.close()
        browser.close()
finally:
    server.shutdown()

(ROOT / "AUDIT-browser.json").write_text(json.dumps(RESULTS, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(RESULTS, ensure_ascii=False, indent=2))
