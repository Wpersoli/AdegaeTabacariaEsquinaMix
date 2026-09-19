from pathlib import Path
import base64,mimetypes,re,json
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent
html=(root/'index.html').read_text(); css=(root/'styles.css').read_text(); js=(root/'app.js').read_text()
def uri(rel):
 p=root/rel; mime=mimetypes.guess_type(p.name)[0] or 'application/octet-stream'; return 'data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode()
for rel in sorted([p.relative_to(root).as_posix() for p in (root/'assets').rglob('*') if p.is_file()], key=len, reverse=True):
 data=uri(rel); html=html.replace(rel,data); css=css.replace(rel,data); js=js.replace(rel,data)
html=re.sub(r'<link rel="stylesheet" href="styles\.css">','<style>'+css+'</style>',html)
html=re.sub(r'<script src="app\.js" defer></script>','<script>'+js+'</script>',html)
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(viewport={'width':1366,'height':768})
 errors=[]; page.on('pageerror',lambda e: errors.append(str(e)))
 page.set_content(html,wait_until='load'); page.wait_for_timeout(400)
 def check(name,cond,detail=''):
  results.append({'test':name,'ok':bool(cond),'detail':detail})
 check('8 produtos renderizados', page.locator('.product-card').count()==8, str(page.locator('.product-card').count()))
 check('perfil inicial GUEST', page.locator('#drawerRole').inner_text()=='GUEST', page.locator('#drawerRole').inner_text())
 page.click('#menuTrigger'); check('drawer abre', 'is-open' in (page.locator('#drawer').get_attribute('class') or ''))
 page.click('#drawerClose'); page.wait_for_timeout(320); check('drawer fecha', 'is-open' not in (page.locator('#drawer').get_attribute('class') or ''))
 page.click('#profileButton'); check('dialog conta abre', page.locator('#accountDialog').evaluate('(e)=>e.open'))
 page.click('#accountLogin'); page.wait_for_timeout(100); check('login demo CLIENTE', page.locator('#accessLabel').inner_text()=='Cliente', page.locator('#accessLabel').inner_text())
 page.click('#accountClose')
 before=int(page.locator('#cartCount').inner_text()); page.locator('[data-add="1"]').click(); after=int(page.locator('#cartCount').inner_text()); check('adicionar produto incrementa carrinho',after==before+1,f'{before}->{after}')
 page.fill('#searchInput','Gelo'); page.press('#searchInput','Enter'); page.wait_for_timeout(150); check('busca filtra catálogo', page.locator('.product-card').count()==1, str(page.locator('.product-card').count()))
 admin=page.evaluate("()=>window.EsquinaMix.setRole('ADMIN')"); check('API setRole ADMIN',admin and page.locator('#drawerRole').inner_text()=='ADMIN',page.locator('#drawerRole').inner_text())
 check('badge ADMIN aparece', page.locator('.admin-badge').count()>=1, str(page.locator('.admin-badge').count()))
 check('sem page errors',len(errors)==0,str(errors))
 b.close()
(root/'AUDIT-interactions.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps(results,ensure_ascii=False,indent=2))
if not all(r['ok'] for r in results): raise SystemExit(1)
