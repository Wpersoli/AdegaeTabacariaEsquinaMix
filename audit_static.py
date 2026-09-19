from pathlib import Path
import re, json, subprocess
root=Path(__file__).resolve().parent
html=(root/'index.html').read_text(encoding='utf-8')
css=(root/'styles.css').read_text(encoding='utf-8')
js=(root/'app.js').read_text(encoding='utf-8')
refs=set(re.findall(r'(?:src|href)=["\']([^"\']+)["\']',html)) | set(re.findall(r'url\(["\']?([^\)"\']+)',css))
missing=[]
for ref in refs:
    if ref.startswith(('http:','https:','#','data:','mailto:','tel:','javascript:')): continue
    if not (root/ref).exists(): missing.append(ref)
ids=re.findall(r'\bid=["\']([^"\']+)',html)
dups=sorted({x for x in ids if ids.count(x)>1})
features={
    'age_gate':'ageGate' in html and 'esquinaMixAge18' in js,
    'cart_drawer':'cartDrawer' in html and 'renderizarCarrinho' in js,
    'chat_widget':'chatWidget' in html and 'respostasChat' in js,
    'back_to_top':'backToTop' in html and 'scrollTo' in js,
    'whatsapp_checkout':'https://wa.me/' in js,
}
node=subprocess.run(['node','--check',str(root/'app.js')],capture_output=True,text=True)
report={'missing_asset_refs':missing,'duplicate_ids':dups,'features':features,'node_check_ok':node.returncode==0,'node_stderr':node.stderr.strip()}
(root/'AUDIT-static.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(0 if not missing and not dups and all(features.values()) and node.returncode==0 else 1)
