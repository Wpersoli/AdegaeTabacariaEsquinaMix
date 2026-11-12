(function(){
'use strict';
/* EDITE AQUI: catálogo (preços de exemplo — substitua pelos reais) */
var catalog=[
{id:1,cat:'bebidas',n:'Cerveja long neck 355ml',p:7.9,promo:1}, /* para usar foto: adicione img:'assets/produtos/arquivo.webp' */
{id:2,cat:'bebidas',n:'Energético 473ml',p:9.9},
{id:3,cat:'bebidas',n:'Whisky 1L',p:129.9},
{id:4,cat:'bebidas',n:'Vodka 900ml',p:44.9,promo:1},
{id:5,cat:'bebidas',n:'Combo gelo + refrigerante',p:19.9,promo:1},
{id:6,cat:'narguile',n:'Essência para narguile 50g',p:24.9},
{id:7,cat:'narguile',n:'Carvão para narguile',p:14.9},
{id:8,cat:'tabacos',n:'Seda king size',p:5.5},
{id:9,cat:'tabacos',n:'Charuto',p:29.9},
{id:10,cat:'headshop',n:'Isqueiro',p:6.9},
{id:11,cat:'headshop',n:'Dichavador',p:19.9},
/* Produtos com foto (ids 12+). ATENCAO: precos abaixo sao EXEMPLO, substitua pelos reais */
{id:12,cat:'bebidas',n:'Cerveja Brahma Duplo Malte lata 350ml',p:4.5,img:'assets/produtos/cerveja-brahma-duplo-malte-lata-350ml.webp'},
{id:13,cat:'bebidas',n:'Cerveja Budweiser lata 269ml',p:3.9,promo:1,img:'assets/produtos/cerveja-budweiser-lata-269ml.webp'},
{id:14,cat:'bebidas',n:'Cerveja Eisenbahn Pilsen lata 350ml',p:5.5,img:'assets/produtos/cerveja-eisenbahn-pilsen-lata-350ml.webp'},
{id:15,cat:'bebidas',n:'Cerveja Império Puro Malte lata 269ml',p:3.5,img:'assets/produtos/cerveja-imperio-puro-malte-lata-269ml.webp'},
{id:16,cat:'bebidas',n:'Cerveja Original Pilsen lata 269ml',p:4.5,img:'assets/produtos/cerveja-original-pilsen-lata-269ml.webp'},
{id:17,cat:'bebidas',n:'Cerveja Petra Puro Malte lata 269ml',p:3.5,img:'assets/produtos/cerveja-petra-puro-malte-lata-269ml.webp'},
{id:18,cat:'bebidas',n:'Cerveja Amstel Puro Malte lata 269ml',p:3.9,img:'assets/produtos/cerveja-amstel-puro-malte-lata-269ml.webp'},
{id:19,cat:'bebidas',n:'Cerveja Michelob Ultra lata 350ml',p:5.9,img:'assets/produtos/cerveja-michelob-ultra-lata-350ml.webp'},
{id:20,cat:'bebidas',n:'Cerveja Blue Moon lata 350ml',p:7.9,img:'assets/produtos/cerveja-blue-moon-lata-350ml.webp'},
{id:21,cat:'bebidas',n:'Cerveja Lagunitas IPA lata 350ml',p:8.9,img:'assets/produtos/cerveja-lagunitas-ipa-lata-350ml.webp'},
{id:22,cat:'bebidas',n:'Cerveja Lagunitas Day Time Session IPA lata 350ml',p:8.9,img:'assets/produtos/cerveja-lagunitas-day-time-session-ipa-lata-350ml.webp'},
{id:23,cat:'bebidas',n:'Cerveja Dogma IPA lata 355ml',p:8.5,img:'assets/produtos/cerveja-dogma-ipa-lata-355ml.webp'},
{id:24,cat:'bebidas',n:'Cerveja Löhn Serra do Rio do Rastro IPA long neck 355ml',p:12.9,img:'assets/produtos/cerveja-lohn-serra-do-rio-do-rastro-ipa-long-neck-355ml.webp'},
{id:25,cat:'bebidas',n:'Cerveja 1906 Black Coupage 330ml',p:9.9,img:'assets/produtos/cerveja-1906-black-coupage-330ml.webp'},
{id:26,cat:'bebidas',n:'Cerveja Heineken 0.0 zero álcool lata 269ml',p:4.9,img:'assets/produtos/cerveja-heineken-0-0-zero-alcool-lata-269ml.webp'},
{id:27,cat:'bebidas',n:'Cerveja Heineken 0.0 zero álcool lata 350ml',p:5.9,img:'assets/produtos/cerveja-heineken-0-0-zero-alcool-lata-350ml.webp'},
{id:28,cat:'bebidas',n:'Cerveja Corona Sunbrew zero álcool long neck 330ml',p:6.9,img:'assets/produtos/cerveja-corona-sunbrew-zero-alcool-long-neck-330ml.webp'},
{id:29,cat:'bebidas',n:'Cerveja Amnésia IPA sem álcool lata 350ml',p:9.9,img:'assets/produtos/cerveja-amnesia-ipa-sem-alcool-com-tempernos-lata-350ml.webp'},
{id:30,cat:'bebidas',n:'Barril de cerveja Heineken 5 litros',p:129.9,img:'assets/produtos/barril-de-cerveja-heineken-5-litros.webp'},
{id:31,cat:'bebidas',n:'Aperitivo Campari 998ml',p:69.9,img:'assets/produtos/aperitivo-campari-998ml.webp'},
{id:32,cat:'bebidas',n:'Aperitivo Aperol 750ml',p:64.9,img:'assets/produtos/aperol-aperitivo-750ml.webp'},
{id:33,cat:'bebidas',n:'Bob Pinga 975ml',p:29.9,img:'assets/produtos/bob-pinga-975ml.webp'},
{id:34,cat:'bebidas',n:'Busca Brisa 1L',p:24.9,img:'assets/produtos/busca-brisa-1l.webp'},
{id:35,cat:'bebidas',n:'Cabaré Ice frutas vermelhas long neck 275ml',p:7.9,promo:1,img:'assets/produtos/bebida-mista-cabare-ice-frutas-vermelhas-long-neck-275ml.webp'},
{id:36,cat:'bebidas',n:'Cabaré Ice limão long neck 275ml',p:7.9,promo:1,img:'assets/produtos/cabare-ice-limao-long-neck-275ml.webp'},
{id:37,cat:'bebidas',n:'Mascate Rum com caju lata 355ml',p:6.9,img:'assets/produtos/bebida-mista-mascate-run-com-caju-lata-355ml.webp'},
{id:38,cat:'bebidas',n:'Chá de Cana lata 355ml',p:6.9,img:'assets/produtos/bebida-mista-xa-de-cana-lata-355ml.webp'},
{id:39,cat:'bebidas',n:'Xeque Mate lata 355ml',p:6.9,img:'assets/produtos/bebida-mista-xeque-mate-lata-355ml.webp'}
];
var $=function(i){return document.getElementById(i)};
var save=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
var load=function(k){try{return localStorage.getItem(k)}catch(e){return null}};
var cat='todos',term='',cart={};
try{var raw=JSON.parse(load('emCart')||'{}')||{};catalog.forEach(function(x){var q=parseInt(raw[x.id],10);if(q>0)cart[x.id]=Math.min(q,99)})}catch(e){cart={}}
var brl=function(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})};
var norm=function(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()};
var names={todos:'Cardápio digital',promo:'Promoções',narguile:'Narguile',headshop:'Headshop',tabacos:'Cigarros e tabacos',bebidas:'Bebidas'};

/* Age gate */
var gate=$('gate');
/* Isola o fundo (inert) e trava o scroll enquanto um diálogo está aberto */
function lock(dlg,on){[].forEach.call(document.body.children,function(n){if(n!==dlg&&n.tagName!=='SCRIPT'&&n.id!=='veil')n.inert=on});document.body.style.overflow=on?'hidden':''}
if(load('esquinaMixAge18')==='yes'){gate.hidden=true}else{lock(gate,true);$('yes').focus()}
$('yes').onclick=function(){save('esquinaMixAge18','yes');gate.hidden=true;lock(gate,false)};
$('no').onclick=function(){$('deny').hidden=false};

/* Catálogo */
/* Filtro inteligente: tags automaticas a partir do nome (ou x.t:['Tag'] no catalogo), busca tolerante e preco em linguagem natural ("ipa ate 9") */
var sel={},sortBy='rel',subF=null;
var ZERO=/zero alcool|sem alcool|0\.0/,T=function(re){return function(x,s){return re.test(s)}};
/* Filtros fixos, na ordem em que aparecem. Cada item entra automaticamente pelo nome ou manualmente com t:['Nome do filtro'] no catalogo */
var CH=[['Ofertas',function(x){return !!x.promo}],
['Cerveja Gelada',function(x,s){return /cerveja/.test(s)&&!ZERO.test(s)}],
['Drinks Prontos',T(/cabare|mascate|cha de cana|xeque mate/)],
['Vinhos',T(/vinho|espumante|prosecco|champanhe/)],
['Salgadinhos',T(/salgadinho|batata|amendoim|ruffles|doritos|cheetos|torcida/)],
['Refri e Energ',T(/energetico|refrigerante|refri\b|guarana|coca|pepsi/)],
['Zero e Fit',function(x,s){return ZERO.test(s)||/ultra|light|diet|\bfit\b/.test(s)}],
['Churrasco',function(x,s){return /carvao|churrasc|espeto|sal grosso|picanha/.test(s)&&!/narguile/.test(s)}],
['Chopp',T(/chopp|chope|barril/)],
['Novidades',function(){return false}],
['Cerveja Sem Alcool',T(ZERO)],
['Águas e Gelo',T(/agua|gelo/)],
['Sobremesas',T(/sobremesa|sorvete|pudim|chocolate|picole/)],
['Mercadinho',function(){return false}],
['Conveniência',T(/isqueiro|pilha|carregador|chiclete|\bbala\b/)],
['Destilados',T(/whisk|vodka|\bgin\b|cachaca|pinga|tequila|busca brisa/)],
['Aperitivos',T(/aperitivo|campari|aperol/)],
['Sucos e Chás',T(/\bsuco|cha gelado|cha verde|ice tea|leao/)]];
var PR=[['Até R$ 5',-1,5],['De R$ 5 a 10',5,10]];

/* Menu suspenso do topo: subcategorias (filtram o catalogo do proprio site). Cada item entra pelo nome ou manualmente com t:['Nome do item'] */
var S=function(label,re,ex){return[label,function(x,s){return(re.test(s)&&!(ex&&ex.test(s)))||(x.t||[]).indexOf(label)>-1}]};
var SUBS={
narguile:[S('Carvão Alumínio Narguile Acessórios',/carvao|aluminio|acessorio/),S('Essências Narguile',/essencia/)],
headshop:[S('Sedas e Celulose Tabacaria',/seda|celulose/),S('Piteiras de Papel',/piteira/,/vidro/),S('Isqueiros e Maçarico a Gás',/isqueiro|macarico/),S('Filtros Tabacaria',/filtro/),S('Acessórios Headshop e Tabacaria',/dichavador|acessorio|balanca|bong|tesoura/),S('Piteiras de Vidro',/piteira.*vidro|vidro.*piteira/),S('Cinzeiros',/cinzeiro/),S('Incenso Indiano',/incenso/),S('Variedade e Conveniência',/pilha|carregador|chiclete|\bbala\b|variedade/)],
tabacos:[S('Tabaco',/tabaco|\bfumo\b/),S('Cigarros',/cigarro/,/palha/),S('Charutos e Cigarrilhas',/charuto|cigarrilha/),S('Cigarro de Palha',/palha|palheiro/)],
bebidas:[S('Copão Não?! Sacão!',/copao|sacao/),S('Licores e Aperitivos',/licor|aperitivo|campari|aperol/),S('Cervejas Artesanais e Sem Glúten',/artesanal|sem gluten|\bipa\b|lagunitas|dogma|blue moon|lohn|1906|ultra/),S('Cervejas sem álcool',ZERO),S('Cervejas Lata e Long Neck',/cerveja.*(lata|long neck)/),S('Bebida Mista e Drink Pronto',/cabare|mascate|cha de cana|xeque mate|bebida mista|drink/),S('Drink Mansão Maromba',/mansao|maromba/),S('Vinhos e Chopp de Vinho',/vinho|espumante|chopp de vinho/),S('Refrigerantes Gelados',/refrigerante|refri\b|coca|guarana|pepsi/),S('Energético',/energetico/),S('Gin e Combo de Gin',/\bgin\b/),S('Whisky e Combo de Whisky',/whisk/),S('Vodka e Combo de Vodka',/vodka/)]};
var SYN={breja:'cerveja',cervejinha:'cerveja',gelada:'cerveja',latinha:'lata',longneck:'long',sem:'zero'};
function tagsOf(x){if(x._t)return x._t;var s=norm(x.n),t=[];CH.forEach(function(c){if(c[1](x,s))t.push(c[0])});(x.t||[]).forEach(function(a){if(t.indexOf(a)<0)t.push(a)});x._t=t;return t}
function wordsOf(x){if(!x._w)x._w=norm(x.n+' '+names[x.cat]+' '+tagsOf(x).join(' ')).split(/[^a-z0-9]+/).filter(Boolean);return x._w}
function lev(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++)d[i]=[i];for(j=1;j<=n;j++)d[0][j]=j;for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function tokenMatch(t,ws){var k=t.length>6?2:1;return ws.some(function(w){return w.indexOf(t)>-1||(t.length>3&&w.length>3&&(lev(w.slice(0,t.length),t)<=k||lev(w,t)<=k))})}
function parseTerm(v){var s=norm(v==null?term:v),mx=null,mn=null,m,num=function(v){return parseFloat(v.replace(',','.'))};
  if((m=s.match(/(?:ate|menos de|abaixo de|max(?:imo)?)\s*(?:r\$)?\s*(\d+(?:[.,]\d+)?)/))){mx=num(m[1]);s=s.replace(m[0],' ')}
  if((m=s.match(/(?:acima de|mais de|a partir de|min(?:imo)?)\s*(?:r\$)?\s*(\d+(?:[.,]\d+)?)/))){mn=num(m[1]);s=s.replace(m[0],' ')}
  return{w:s.split(/[^a-z0-9]+/).filter(Boolean).map(function(t){return SYN[t]||t}),mx:mx,mn:mn}}
function has(x,k){if(k.slice(0,2)==='p:'){var r=PR[+k.slice(2)];return x.p>r[1]&&x.p<=r[2]}return tagsOf(x).indexOf(k)>-1}
function matchSel(x){var ks=Object.keys(sel),cs=ks.filter(function(k){return k.slice(0,2)!=='p:'}),pk=ks.filter(function(k){return k.slice(0,2)==='p:'})[0];
  return(!cs.length||cs.some(function(k){return has(x,k)}))&&(!pk||has(x,pk))}
/* Subcategorias do cardapio = exatamente os itens do menu suspenso do topo (SUBS) */
function facets(base,q){
  var box=$('facets');if(!box)return;box.textContent='';
  (SUBS[cat]||[]).forEach(function(sb,i){var on=!!(subF&&subF.label===sb[0]),b=document.createElement('button');b.type='button';
    b.className='feat-chip'+(on?' is-active':'');b.dataset.i=i;b.setAttribute('aria-pressed',on?'true':'false');b.textContent=sb[0];box.appendChild(b)});
  if(q.mx!=null||q.mn!=null){var n=document.createElement('span');n.className='facet-note';n.textContent='Preço '+(q.mn!=null?'a partir de '+brl(q.mn)+' ':'')+(q.mx!=null?'até '+brl(q.mx):'');box.appendChild(n)}}
function render(){
  var q=parseTerm();
  var base=catalog.filter(function(x){
    var okCat=cat==='todos'||(cat==='promo'?x.promo:x.cat===cat);
    return okCat&&(!subF||subF.t(x,norm(x.n)))&&(q.mx==null||x.p<=q.mx)&&(q.mn==null||x.p>=q.mn)&&q.w.every(function(t){return tokenMatch(t,wordsOf(x))})});
  facets(base,q);
  var list=base.filter(matchSel);
  if(sortBy==='asc')list.sort(function(a,b){return a.p-b.p});else if(sortBy==='desc')list.sort(function(a,b){return b.p-a.p});else if(sortBy==='az')list.sort(function(a,b){return a.n.localeCompare(b.n,'pt-BR')});
  var g=$('grid');g.textContent='';
  if(!list.length){g.innerHTML='<p class="feat__empty">'+(subF?'Ainda não temos itens em “'+subF.label+'” no cardápio digital. Pergunte pelo WhatsApp!':'Nada encontrado. Tente outra busca.')+'</p>';return}
  list.forEach(function(x){
    var c=document.createElement('article');c.className='prod-card';
    c.innerHTML='<div class="prod-filete"></div>'+(x.promo?'<span class="prod-tag">Promo</span>':'')+'<div class="prod-img'+(x.img?' prod-img--foto':'')+'"><img src="'+(x.img||'assets/logo.webp')+'" alt="" width="'+(x.img?800:120)+'" height="'+(x.img?800:123)+'" loading="lazy"></div><p class="prod-cat"></p><h3 class="prod-name"></h3><div class="prod-price"></div><button class="prod-buy">Comprar →</button>';
    c.querySelector('.prod-cat').textContent=names[x.cat];c.querySelector('.prod-name').textContent=x.n;c.querySelector('img').alt=x.img?x.n:'';c.querySelector('.prod-price').textContent=brl(x.p);
    var buy=c.querySelector('.prod-buy');buy.setAttribute('aria-label','Adicionar '+x.n+' à sacola');
    buy.onclick=function(){add(x.id);buy.textContent='Adicionado ✓';clearTimeout(buy.t);buy.t=setTimeout(function(){buy.textContent='Comprar →'},1200)};
    g.appendChild(c)})}

/* Sacola */
function add(id){cart[id]=Math.min((cart[id]||0)+1,99);sync();document.dispatchEvent(new Event('cart:add'));if($('badge').animate)$('badge').animate([{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:250})}
function sync(open){
  var n=0,t=0,ul=$('items');ul.textContent='';
  catalog.forEach(function(x){var q=cart[x.id];if(!q)return;n+=q;t+=q*x.p;
    var li=document.createElement('li');
    li.innerHTML='<span></span><b></b><div class="q"><button aria-label="Menos">−</button><span>'+q+'</span><button aria-label="Mais">+</button></div>';
    li.children[0].textContent=x.n;li.children[1].textContent=brl(q*x.p);
    var b=li.querySelectorAll('button');b[0].setAttribute('aria-label','Diminuir '+x.n);b[1].setAttribute('aria-label','Aumentar '+x.n);
    b[0].onclick=function(){cart[x.id]--;if(cart[x.id]<1)delete cart[x.id];sync()};
    b[1].onclick=function(){add(x.id)};
    ul.appendChild(li)});
  $('badge').textContent=n;$('total').textContent=brl(t);$('send').disabled=!n;$('cartBtn').setAttribute('aria-label','Abrir sacola ('+n+(n===1?' item':' itens')+')');
  save('emCart',JSON.stringify(cart));
  if(open)toggle(true)}
var lastFocus=null;
function toggle(o){var d=$('drawer');if(o===!d.hidden)return;d.hidden=!o;$('veil').hidden=!o;lock(d,o);
  if(o){lastFocus=document.activeElement;$('closeCart').focus()}else if(lastFocus){lastFocus.focus();lastFocus=null}}
$('cartBtn').onclick=function(){toggle(true)};
$('closeCart').onclick=$('veil').onclick=function(){toggle(false)};
$('send').onclick=function(){
  var l=['*Pedido — Esquina Mix*'],t=0;
  catalog.forEach(function(x){var q=cart[x.id];if(q){l.push(q+'x '+x.n+' — '+brl(q*x.p));t+=q*x.p}});
  l.push('*Total: '+brl(t)+'*');
  var m=document.querySelector('meta[name="esquina-whatsapp"]'),num=((m&&m.content)||'').replace(/\D/g,'');
  if(!num)return;window.open('https://wa.me/'+num+'?text='+encodeURIComponent(l.join('\n')),'_blank','noopener')};

/* Navegação e busca */
function setCat(c,keep){cat=c;if(!keep)subF=null;
  [].forEach.call(document.querySelectorAll('#nav button'),function(x){x.classList.toggle('on',x.dataset.cat===c&&c!=='todos'?true:(c==='todos'&&x.textContent.trim()==='Início'))});
  [].forEach.call($('chips').children,function(x){x.classList.toggle('is-active',x.dataset.cat===c)});
  var on=document.querySelector('#nav button.on');if(on&&on.scrollIntoView)on.scrollIntoView({inline:'center',block:'nearest'});
  render()}
$('nav').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;setCat(b.dataset.cat);document.getElementById('cardapio').scrollIntoView()});
$('chips').addEventListener('click',function(e){var b=e.target.closest('button');if(b)setCat(b.dataset.cat)});
$('facets').addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.dataset.i==null)return;var sb=(SUBS[cat]||[])[+b.dataset.i];if(!sb)return;subF=(subF&&subF.label===sb[0])?null:{label:sb[0],t:sb[1]};render()});
$('sort').addEventListener('change',function(){sortBy=this.value;render()});
var qt;$('q').addEventListener('input',function(){var v=this.value;clearTimeout(qt);qt=setTimeout(function(){term=v;render()},120)});

/* Auto-preenchimento da busca do topo: sugere produtos pelas iniciais (tolera erro de digitacao e entende "ipa ate 9") */
(function(){
  var q=$('q'),box=document.createElement('ul'),items=[],act=-1,total=0;
  box.id='sug';box.className='sug';box.setAttribute('role','listbox');box.hidden=true;q.parentNode.appendChild(box);
  q.setAttribute('role','combobox');q.setAttribute('aria-autocomplete','list');q.setAttribute('aria-controls','sug');q.setAttribute('aria-expanded','false');
  function rank(x,t){var s=norm(x.n);if(s.indexOf(t)===0)return 0;if(s.replace(/^(cerveja|aperitivo|barril de cerveja|bebida mista)\s+/,'').indexOf(t)===0)return 1;
    if(wordsOf(x).some(function(w){return w.indexOf(t)===0}))return 2;return s.indexOf(t)>-1?3:4}
  function nw(x){return x._nw||(x._nw=norm(x.n).split(/[^a-z0-9]+/).filter(Boolean))}
  function find(v){var p=parseTerm(v);if(!p.w.length&&p.mx==null&&p.mn==null)return{list:[],t:''};var last=p.w[p.w.length-1]||'';
    var l=catalog.filter(function(x){return(p.mx==null||x.p<=p.mx)&&(p.mn==null||x.p>=p.mn)&&p.w.every(function(t){return tokenMatch(t,nw(x))})});
    l=l.map(function(x,i){return{x:x,r:last?rank(x,last):0,i:i}}).sort(function(a,b){return a.r-b.r||a.i-b.i}).map(function(o){return o.x});
    return{list:l,t:last}}
  function close(){box.hidden=true;q.setAttribute('aria-expanded','false');q.removeAttribute('aria-activedescendant');act=-1}
  function mark(el,name,t){var k=t?norm(name).indexOf(t):-1;if(k<0){el.textContent=name;return}
    el.appendChild(document.createTextNode(name.slice(0,k)));var m=document.createElement('mark');m.textContent=name.slice(k,k+t.length);el.appendChild(m);el.appendChild(document.createTextNode(name.slice(k+t.length)))}
  function go(){var el=document.getElementById('cardapio');if(el)el.scrollIntoView()}
  function pick(k){var o=items[k];if(!o)return;
    if(o.more){term=q.value;sel={};close();render();go();return}
    q.value=o.x.n;term=o.x.n;sel={};close();if(cat!=='todos')setCat('todos');else render();go()}
  function show(){var r=find(q.value);box.textContent='';items=[];act=-1;total=r.list.length;
    if(!q.value.trim()){close();return}
    r.list.slice(0,6).forEach(function(x){items.push({x:x})});
    if(!items.length){var n=document.createElement('li');n.className='sug__empty';n.textContent='Nenhum produto encontrado';box.appendChild(n);box.hidden=false;q.setAttribute('aria-expanded','true');return}
    if(total>6)items.push({more:1});
    items.forEach(function(o,k){var li=document.createElement('li');li.id='sug'+k;li.setAttribute('role','option');li.className='sug__i'+(o.more?' sug__more':'');li.dataset.k=k;
      if(o.more){li.textContent='Ver todos os '+total+' resultados →'}
      else{var im=document.createElement('img');im.src=o.x.img||'assets/logo.webp';im.alt='';im.width=40;im.height=40;im.loading='lazy';li.appendChild(im);
        var tx=document.createElement('span');tx.className='sug__n';var nm=document.createElement('span');mark(nm,o.x.n,r.t);tx.appendChild(nm);var sm=document.createElement('small');sm.textContent=names[o.x.cat];tx.appendChild(sm);li.appendChild(tx);
        var pr=document.createElement('b');pr.textContent=brl(o.x.p);li.appendChild(pr)}
      box.appendChild(li)});
    box.hidden=false;q.setAttribute('aria-expanded','true')}
  function setAct(k){var all=box.querySelectorAll('.sug__i');if(!all.length)return;act=(k+all.length)%all.length;
    [].forEach.call(all,function(e,i){e.classList.toggle('is-act',i===act);e.setAttribute('aria-selected',i===act?'true':'false')});q.setAttribute('aria-activedescendant','sug'+act);all[act].scrollIntoView({block:'nearest'})}
  q.addEventListener('input',show);q.addEventListener('focus',function(){if(q.value.trim())show()});
  q.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'){if(box.hidden)show();setAct(act+1);e.preventDefault()}
    else if(e.key==='ArrowUp'){setAct(act-1);e.preventDefault()}
    else if(e.key==='Enter'){e.preventDefault();if(!box.hidden&&act>-1)pick(act);else{term=q.value;sel={};close();render();go()}}
    else if(e.key==='Escape'){close()}});
  box.addEventListener('mousedown',function(e){e.preventDefault()});
  box.addEventListener('click',function(e){var li=e.target.closest('.sug__i');if(li)pick(+li.dataset.k)});
  document.addEventListener('click',function(e){if(!e.target.closest('.search'))close()});
  q.addEventListener('blur',function(){setTimeout(close,120)});
})();

/* Menu suspenso flutuante (hover no desktop, toque no celular) com entrada em cascata */
(function(){
  var nav=$('nav'),m=document.createElement('div'),ul=document.createElement('ul'),cur=null,tm,
      touch=function(){return window.matchMedia('(hover:none)').matches};
  m.id='mega';m.className='mega';m.hidden=true;m.setAttribute('role','menu');ul.className='mega__list';m.appendChild(ul);document.body.appendChild(m);
  [].forEach.call(nav.querySelectorAll('button[data-cat]'),function(b){if(SUBS[b.dataset.cat]){b.classList.add('has-sub');b.setAttribute('aria-haspopup','true');b.setAttribute('aria-expanded','false')}});
  function close(){clearTimeout(tm);if(cur)cur.setAttribute('aria-expanded','false');cur=null;m.hidden=true}
  function later(){clearTimeout(tm);tm=setTimeout(close,220)}
  function place(b){var r=b.getBoundingClientRect(),w=m.offsetWidth;m.style.left=Math.max(8,Math.min(r.left,window.innerWidth-w-8))+'px';m.style.top=r.bottom+'px';m.style.maxHeight=Math.max(160,window.innerHeight-r.bottom-12)+'px'}
  function go(c,sub){close();subF=sub?{label:sub[0],t:sub[1]}:null;setCat(c,true);var el=document.getElementById('cardapio');if(el)el.scrollIntoView()}
  function open(b){clearTimeout(tm);if(cur===b&&!m.hidden)return;close();cur=b;var c=b.dataset.cat,list=SUBS[c];ul.textContent='';
    var add=function(label,fn,cls,i){var li=document.createElement('li');li.setAttribute('role','none');var a=document.createElement('button');a.type='button';a.setAttribute('role','menuitem');a.className='mega__i'+(cls?' '+cls:'');a.style.setProperty('--i',i);a.textContent=label;a.onclick=fn;li.appendChild(a);ul.appendChild(li)};
    add('Ver tudo em '+names[c],function(){go(c,null)},'mega__all',0);
    list.forEach(function(sb,i){add(sb[0],function(){go(c,sb)},'',i+1)});
    m.classList.toggle('cols',list.length>6&&window.innerWidth>=640);m.hidden=false;place(b);b.setAttribute('aria-expanded','true')}
  nav.addEventListener('mouseover',function(e){if(touch())return;var b=e.target.closest('button');if(!b)return;clearTimeout(tm);
    if(b.classList.contains('has-sub'))tm=setTimeout(function(){open(b)},70);else later()});
  nav.addEventListener('mouseleave',function(){if(!touch())later()});
  m.addEventListener('mouseenter',function(){clearTimeout(tm)});m.addEventListener('mouseleave',function(){if(!touch())later()});
  nav.addEventListener('click',function(e){var b=e.target.closest('button.has-sub');if(!b||!touch())return;e.stopPropagation();if(cur===b&&!m.hidden)close();else open(b)},true);
  nav.addEventListener('click',function(){close()});
  nav.addEventListener('keydown',function(e){var b=e.target.closest('button.has-sub');if(b&&e.key==='ArrowDown'){e.preventDefault();open(b);var f=ul.querySelector('button');if(f)f.focus()}else if(e.key==='Escape')close()});
  m.addEventListener('keydown',function(e){var all=[].slice.call(ul.querySelectorAll('button')),i=all.indexOf(document.activeElement);
    if(e.key==='ArrowDown'){e.preventDefault();all[(i+1)%all.length].focus()}else if(e.key==='ArrowUp'){e.preventDefault();all[(i-1+all.length)%all.length].focus()}
    else if(e.key==='Escape'||e.key==='Tab'){var b=cur;close();if(b&&e.key==='Escape')b.focus()}});
  document.addEventListener('click',function(e){if(!m.contains(e.target)&&!nav.contains(e.target))close()});
  window.addEventListener('scroll',function(){if(!m.hidden)close()},{passive:true});nav.addEventListener('scroll',close,{passive:true});window.addEventListener('resize',close);
})();

/* Convite para instalar o app: Android/Chrome/Edge usam o botao nativo; iPhone/iPad mostram o passo a passo "Adicionar a Tela de Inicio" */
(function(){
  var KEY='esquinaMixInstall',DIAS=7,dp=null,el=null,shown=false,tm,
      ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),
      standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
  if(standalone)return;
  var snooze=function(d){save(KEY,String(Date.now()+d*864e5))},muted=function(){var t=+load(KEY);return !!t&&Date.now()<t};
  function hide(){if(el){el.remove();el=null}}
  function schedule(ms){clearTimeout(tm);tm=setTimeout(maybe,ms)}
  function node(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n}
  function maybe(){if(shown||muted()||!gate.hidden||(!dp&&!ios))return;shown=true;
    el=node('div','pwa');el.setAttribute('role','dialog');el.setAttribute('aria-label','Instalar aplicativo');
    var ic=node('img','pwa__ic');ic.src='assets/icon-192.png';ic.alt='';ic.width=48;ic.height=48;el.appendChild(ic);
    var tx=node('div','pwa__tx');tx.appendChild(node('strong','','Instale o app da Esquina Mix'));tx.appendChild(node('span','',ios?'Adicione à tela inicial e peça mais rápido, sem digitar o endereço.':'Abra direto da tela inicial do seu aparelho e peça mais rápido.'));
    var steps=null;if(ios){steps=node('ol','pwa__st');steps.hidden=true;['Toque em Compartilhar (o quadrado com a seta para cima) na barra do navegador.','Role a lista e toque em “Adicionar à Tela de Início”.','Toque em “Adicionar”. Pronto!'].forEach(function(t){steps.appendChild(node('li','',t))});tx.appendChild(steps)}
    el.appendChild(tx);
    var ac=node('div','pwa__ac'),go=node('button','pwa__go',ios?'Como instalar':'Instalar');go.type='button';
    go.onclick=function(){if(ios){steps.hidden=!steps.hidden;go.textContent=steps.hidden?'Como instalar':'Entendi';if(steps.hidden){snooze(30);hide()}return}
      if(!dp)return;dp.prompt();dp.userChoice.then(function(c){dp=null;snooze(c&&c.outcome==='accepted'?365:DIAS);hide()},function(){hide()})};
    var no=node('button','pwa__x','Agora não');no.type='button';no.onclick=function(){snooze(DIAS);hide()};
    ac.appendChild(go);ac.appendChild(no);el.appendChild(ac);document.body.appendChild(el)}
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;schedule(4000)});
  window.addEventListener('appinstalled',function(){snooze(365);hide()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&el){snooze(DIAS);hide()}});
  $('yes').addEventListener('click',function(){schedule(6000)});
  if(gate.hidden&&ios)schedule(7000);
})();
document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});

/* Ranking, marcas e avaliações — EDITE os dados abaixo */
var topIds=[1,2,4,5,3,6,9,10];
var brands=[{n:'Girls in Green',f:'girls-in-green'},{n:'Papelito',f:'papelito'},{n:'Smoking',f:'smoking'},{n:'ZGY Brasil',f:'zgy-brasil'},{n:'Zomo',f:'zomo'},{n:'OCB',f:'ocb'},{n:'Pay-Pay',f:'pay-pay'},{n:'Sadhu',f:'sadhu'}];
var reviews=[]; /* ex.: {n:'Nome',t:'há 1 semana',x:'Texto da avaliação'} */
(function(){
  var tr=$('rankTrack');
  topIds.forEach(function(id,i){var x=catalog.filter(function(c){return c.id===id})[0];if(!x)return;
    var a=document.createElement('button');a.className='rank-card';
    a.innerHTML='<b class="rank-n"></b><img src="assets/logo.webp" alt="" width="64" height="65" loading="lazy"><span class="rank-i"><small></small><strong></strong><em></em></span>';
    a.querySelector('.rank-n').textContent=('0'+(i+1)).slice(-2);a.querySelector('small').textContent=names[x.cat];
    a.querySelector('strong').textContent=x.n;a.querySelector('em').textContent=brl(x.p);
    a.setAttribute('aria-label','Adicionar '+x.n+' à sacola');a.onclick=function(){add(x.id)};tr.appendChild(a)});
  var d=0,sx=0,sl=0;
  tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;d=1;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('is-grabbing')});
  window.addEventListener('pointermove',function(e){if(d)tr.scrollLeft=sl-(e.clientX-sx)});
  window.addEventListener('pointerup',function(){d=0;tr.classList.remove('is-grabbing')});
  var bt=$('brandsT');brands.forEach(function(b){var s=document.createElement('span');s.className='fleet__i fleet__i--'+b.f;var im=document.createElement('img');im.src='assets/marcas/'+b.f+'.webp';im.alt=b.n;im.decoding='async';s.appendChild(im);bt.appendChild(s)});
  /* letreiros: deslizam para a esquerda em loop contínuo; pausam com mouse/toque */
  function slide(track){var box=track.parentNode,base=[].slice.call(track.children),w=track.getBoundingClientRect().width||1,
    reps=Math.max(1,Math.ceil(Math.max(window.innerWidth,box.offsetWidth)/w)),f=document.createDocumentFragment();
    for(var i=1;i<reps;i++)base.forEach(function(k){f.appendChild(k.cloneNode(true))});
    track.appendChild(f);
    [].slice.call(track.children).forEach(function(k,i){if(i>=base.length)k.setAttribute('aria-hidden','true')});
    var all=[].slice.call(track.children);f=document.createDocumentFragment();
    all.forEach(function(k){var c=k.cloneNode(true);c.setAttribute('aria-hidden','true');f.appendChild(c)});
    track.appendChild(f);
    track.style.animationDuration=Math.max(12,track.getBoundingClientRect().width/2/70)+'s';
    box.addEventListener('touchstart',function(){track.classList.add('is-paused')},{passive:true});
    ['touchend','touchcancel'].forEach(function(ev){box.addEventListener(ev,function(){track.classList.remove('is-paused')},{passive:true})})}
  slide(document.querySelector('#mq .mq-t'));slide(bt);
  var r=$('revList');
  if(!reviews.length){r.innerHTML='<article class="rev-card"><p>Já pediu na Esquina Mix? Conte como foi a sua experiência no Google.</p></article>'}
  reviews.forEach(function(v){var c=document.createElement('article');c.className='rev-card';
    c.innerHTML='<header><span class="av"></span><div><strong></strong><small></small></div></header><div class="st">★★★★★</div><p></p>';
    c.querySelector('.av').textContent=v.n.charAt(0);c.querySelector('strong').textContent=v.n;c.querySelector('small').textContent=v.t;c.querySelector('p').textContent=v.x;r.appendChild(c)});
})();
/* Botoes flutuantes: WhatsApp (numero vem da meta esquina-whatsapp) e voltar ao topo */
(function(){
  var wa=$('waFab'),up=$('toTop'),mm=document.querySelector('meta[name="esquina-whatsapp"]'),num=((mm&&mm.content)||'').replace(/\D/g,'');
  if(wa&&num)wa.href='https://wa.me/'+num+'?text='+encodeURIComponent('Ol\u00e1! Vim pelo card\u00e1pio digital da Esquina Mix.');
  if(!up)return;
  var on=false,busy=false;
  function upd(){busy=false;var s=(window.pageYOffset||document.documentElement.scrollTop||0)>400;if(s!==on){on=s;up.classList.toggle('is-on',s)}}
  window.addEventListener('scroll',function(){if(!busy){busy=true;requestAnimationFrame(upd)}},{passive:true});
  up.addEventListener('click',function(){
    var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top:0,behavior:calm?'auto':'smooth'})});
  upd();
})();
/* Rota até a loja: geolocalização sob demanda (HTTPS), atualiza ao se deslocar >100 m e a cada >=30 s */
(function(){
  var MAPS_KEY='', /* opcional: chave da Maps Embed API restrita por referrer (rota com trânsito oficial) */
      DEST='Adega e Tabacaria Esquina Mix, R. São Francisco, 285, Vila Galvão, Guarulhos - SP',
      btn=$('routeBtn'),st=$('routeStatus'),fr=$('mapFrame'),lnk=$('routeOpen'),modes=$('routeModes');
  if(!btn||!fr)return;
  var mode='driving',pos=null,last=null,watch=null,flg={driving:'d',walking:'w',bicycling:'b',transit:'r'};
  function dist(a,b){var r=Math.PI/180,R=6371e3,p=(b.lat-a.lat)*r,q=(b.lng-a.lng)*r,
    x=Math.sin(p/2)*Math.sin(p/2)+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(q/2)*Math.sin(q/2);return 2*R*Math.asin(Math.sqrt(x))}
  function draw(){
    var o=pos.lat.toFixed(6)+','+pos.lng.toFixed(6),d=encodeURIComponent(DEST);
    fr.src=MAPS_KEY?'https://www.google.com/maps/embed/v1/directions?key='+encodeURIComponent(MAPS_KEY)+'&origin='+o+'&destination='+d+'&mode='+mode+'&language=pt-BR&region=BR'
      :'https://maps.google.com/maps?saddr='+o+'&daddr='+d+'&dirflg='+flg[mode]+'&hl=pt-BR&output=embed';
    lnk.href='https://www.google.com/maps/dir/?api=1&origin='+o+'&destination='+d+'&travelmode='+mode;lnk.hidden=false;
    last={lat:pos.lat,lng:pos.lng,t:Date.now()}}
  function onPos(p){pos={lat:p.coords.latitude,lng:p.coords.longitude};
    if(!last||(dist(pos,last)>100&&Date.now()-last.t>=30000)){draw();
      st.textContent='Rota traçada a partir da sua posição (precisão ≈ '+Math.round(p.coords.accuracy)+' m). O tempo de viagem aparece no mapa e é atualizado conforme você se desloca.'}}
  function onErr(e){btn.disabled=false;st.textContent=e.code===1?'Permissão de localização negada. Libere no cadeado do navegador e tente de novo.'
    :e.code===3?'Tempo esgotado ao obter a localização. Tente novamente.':'Não foi possível determinar sua posição. Verifique o GPS e a internet.'}
  var busy=false;
  function start(){
    if(busy)return;
    if(!navigator.geolocation){st.textContent='Seu navegador não oferece localização.';return}
    busy=true;st.textContent='Obtendo a sua localização…';btn.disabled=true;
    navigator.geolocation.getCurrentPosition(function(p){
      busy=false;btn.disabled=false;btn.textContent='Atualizar rota';last=null;onPos(p);
      if(watch===null)watch=navigator.geolocation.watchPosition(onPos,function(){},{enableHighAccuracy:true,maximumAge:10000,timeout:20000})
    },function(e){busy=false;onErr(e)},{enableHighAccuracy:true,timeout:15000,maximumAge:0})}
  btn.onclick=start;
  /* Automático: ao chegar perto do mapa pede/usa a localização; se o usuário permitir depois (pelo cadeado), traça na hora */
  var sec=$('encontre'),armed=false;
  function arm(){if(armed)return;armed=true;start()}
  if(navigator.permissions&&navigator.permissions.query){
    navigator.permissions.query({name:'geolocation'}).then(function(perm){
      perm.onchange=function(){if(perm.state==='granted'&&armed)start()}}).catch(function(){})}
  if('IntersectionObserver' in window&&sec){
    var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();arm()}},{rootMargin:'200px'});io.observe(sec)}
  else arm();
  modes.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;mode=b.dataset.mode;
    [].forEach.call(modes.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});if(pos)draw()});
  window.addEventListener('pagehide',function(){if(watch!==null)navigator.geolocation.clearWatch(watch)});
})();
/* Barra do topo: some ao rolar para baixo e volta ao rolar para cima (também no celular) */
(function(){
  var bar=$('bar');if(!bar)return;
  var lastY=window.pageYOffset||0,ticking=false,hold=0,hidden=false;
  function show(){if(hidden){hidden=false;bar.classList.remove('is-hidden')}}
  function hide(){if(!hidden){hidden=true;bar.classList.add('is-hidden')}}
  /* não esconde: logo após clicar no menu/adicionar item, com sacola ou gate abertos, ou com a busca em foco */
  function blocked(){return Date.now()<hold||document.body.style.overflow==='hidden'||document.activeElement===$('q')}
  function update(){
    ticking=false;
    var y=Math.max(0,window.pageYOffset||0),d=y-lastY;
    if(y<=bar.offsetHeight){show();lastY=y;return}
    if(Math.abs(d)<8)return;
    lastY=y;
    if(d<0)show();else if(!blocked())hide()}
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  bar.addEventListener('focusin',show);
  $('nav').addEventListener('click',function(){hold=Date.now()+900;show()});
  document.addEventListener('cart:add',function(){hold=Date.now()+1500;show()});
})();
/* Altura da barra fixa -> offset de rolagem das âncoras */
(function(){var b=$('bar');if(!b)return;function set(){document.documentElement.style.setProperty('--bar-h',b.offsetHeight+'px')}set();if(window.ResizeObserver)new ResizeObserver(set).observe(b);else window.addEventListener('resize',set)})();
/* Status da loja (horário de Brasília): aberto das OPEN às CLOSE, virando a meia-noite; atualiza a cada minuto */
(function(){
  var OPEN=10,CLOSE=2,dot=$('shopDot'),txt=$('shopTxt'),tr=$('shopTrust');
  if(!dot||!txt)return;
  var fmt=new Intl.DateTimeFormat('pt-BR',{hour:'numeric',hourCycle:'h23',timeZone:'America/Sao_Paulo'}),
      hh=function(n){return ('0'+n).slice(-2)+':00'};
  function paint(){
    var h=parseInt(fmt.format(new Date()),10),open=h>=OPEN||h<CLOSE;
    dot.className='dot '+(open?'is-open':'is-closed');
    txt.textContent=open?'Esquina-Mix aberta • Fecha às '+hh(CLOSE):'Esquina-Mix fechada • Abre às '+hh(OPEN);
    if(tr)tr.textContent=open?'Esquina-Mix aberta':'Esquina-Mix fechada'}
  paint();setInterval(paint,60000);
})();
render();sync();
})();
