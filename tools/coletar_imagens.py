#!/usr/bin/env python3
"""
Coleta fotos de produtos de uma colecao Shopify e padroniza todas:
  - quadrado 800x800, fundo branco, produto centralizado com margem
  - formato WebP (qualidade 82)
Gera assets/produtos/<slug>.webp e tools/produtos_coletados.json.

Uso (no seu computador, com internet):
  pip install pillow
  python tools/coletar_imagens.py --paginas 4 --limite 40

IMPORTANTE: as fotos pertencem a loja de origem / aos fabricantes. Confirme
que voce pode usa-las (ou peca autorizacao) antes de publicar o site.
"""
import argparse, io, json, re, time, unicodedata, urllib.request
from pathlib import Path
from PIL import Image

BASE = "https://adegaplanet.com.br"
COLECAO = "bebidas"
TAM = 800          # lado do quadrado final
MARGEM = 0.08      # 8% de respiro em volta do produto
UA = {"User-Agent": "Mozilla/5.0 (catalogo-esquina-mix)"}

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60]

def padronizar(raw):
    im = Image.open(io.BytesIO(raw))
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        fundo = Image.new("RGBA", im.size, (255, 255, 255, 255))
        fundo.alpha_composite(im)
        im = fundo
    im = im.convert("RGB")
    area = int(TAM * (1 - 2 * MARGEM))
    im.thumbnail((area, area), Image.LANCZOS)
    tela = Image.new("RGB", (TAM, TAM), (255, 255, 255))
    tela.paste(im, ((TAM - im.width) // 2, (TAM - im.height) // 2))
    out = io.BytesIO()
    tela.save(out, "WEBP", quality=82, method=6)
    return out.getvalue()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paginas", type=int, default=4)
    ap.add_argument("--limite", type=int, default=40, help="max de produtos no total")
    ap.add_argument("--saida", default="assets/produtos")
    a = ap.parse_args()
    pasta = Path(a.saida); pasta.mkdir(parents=True, exist_ok=True)
    itens = []
    for pg in range(1, a.paginas + 1):
        url = f"{BASE}/collections/{COLECAO}/products.json?limit=50&page={pg}"
        try:
            dados = json.loads(get(url))
        except Exception as e:
            print(f"pagina {pg}: falhou ({e})"); break
        prods = dados.get("products", [])
        if not prods: break
        for p in prods:
            if len(itens) >= a.limite: break
            if not p.get("images"): continue
            nome = p["title"]; nome_arq = slug(nome)
            try:
                webp = padronizar(get(p["images"][0]["src"]))
            except Exception as e:
                print(f"  pulou {nome}: {e}"); continue
            (pasta / f"{nome_arq}.webp").write_bytes(webp)
            itens.append({"n": nome, "img": f"assets/produtos/{nome_arq}.webp",
                          "origem": f"{BASE}/products/{p['handle']}"})
            print(f"ok  {nome}")
            time.sleep(0.5)  # gentil com o servidor
        if len(itens) >= a.limite: break
    Path("tools/produtos_coletados.json").write_text(
        json.dumps(itens, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n{len(itens)} imagens em {pasta}/ e lista em tools/produtos_coletados.json")

if __name__ == "__main__":
    main()
