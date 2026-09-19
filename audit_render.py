from pathlib import Path
import base64, mimetypes, re, json
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent
html=(root/'index.html').read_text(encoding='utf-8')
css=(root/'styles.css').read_text(encoding='utf-8')
js=(root/'app.js').read_text(encoding='utf-8')
def uri(rel):
    p=root/rel
    mime=mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,'+base64.b64encode(p.read_bytes()).decode()
assets=[p.relative_to(root).as_posix() for p in (root/'assets').rglob('*') if p.is_file()]
for rel in sorted(assets,key=len,reverse=True):
    data=uri(rel); html=html.replace(rel,data); css=css.replace(rel,data); js=js.replace(rel,data)
html=re.sub(r'<link rel="stylesheet" href="styles\.css">','<style>'+css+'</style>',html)
html=re.sub(r'<script src="app\.js" defer></script>','<script>'+js+'</script>',html)
report=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--disable-dev-shm-usage'])
    for width,height,name in [(1999,787,'AUDIT-desktop-1999x787.png'),(1366,768,'AUDIT-desktop-1366x768.png'),(390,844,'AUDIT-mobile-390x844.png')]:
        page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
        errors=[]
        page.on('console', lambda msg,errors=errors: errors.append(f'console {msg.type}: {msg.text}') if msg.type=='error' else None)
        page.on('pageerror', lambda exc,errors=errors: errors.append(f'pageerror: {exc}'))
        page.set_content(html,wait_until='load',timeout=30000)
        page.wait_for_timeout(900)
        info=page.evaluate('''()=>({iw:innerWidth,ih:innerHeight,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight,hero:document.querySelector('.hero-banner')?.getBoundingClientRect().toJSON(),productCount:document.querySelectorAll('.product-card').length,drawerHidden:document.querySelector('#drawer')?.getAttribute('aria-hidden')})''')
        page.screenshot(path=str(root/name),full_page=False)
        report.append({'name':name,'info':info,'errors':errors})
        page.close()
    browser.close()
(root/'AUDIT-browser.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
