(function(){
'use strict';
/* EDITE AQUI: catálogo (preços de exemplo — substitua pelos reais) */
var catalog=[
{id:1,cat:'bebidas',n:'Cerveja long neck 355ml',p:7.9,promo:1},
{id:2,cat:'bebidas',n:'Energético 473ml',p:9.9},
{id:3,cat:'bebidas',n:'Whisky 1L',p:129.9},
{id:4,cat:'bebidas',n:'Vodka 900ml',p:44.9,promo:1},
{id:5,cat:'bebidas',n:'Combo gelo + refrigerante',p:19.9,promo:1},
{id:6,cat:'narguile',n:'Essência para narguile 50g',p:24.9},
{id:7,cat:'narguile',n:'Carvão para narguile',p:14.9},
{id:8,cat:'tabacos',n:'Seda king size',p:5.5},
{id:9,cat:'tabacos',n:'Charuto',p:29.9},
{id:10,cat:'headshop',n:'Isqueiro',p:6.9},
{id:11,cat:'headshop',n:'Dichavador',p:19.9}
];
var $=function(i){return document.getElementById(i)};
var save=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
var load=function(k){try{return localStorage.getItem(k)}catch(e){return null}};
var cat='todos',term='',cart={};
try{cart=JSON.parse(load('emCart')||'{}')||{}}catch(e){cart={}}
var brl=function(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})};
var norm=function(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()};
var names={todos:'Cardápio digital',promo:'Promoções',narguile:'Narguile',headshop:'Headshop',tabacos:'Cigarros e tabacos',bebidas:'Bebidas'};

/* Age gate */
var gate=$('gate');
if(load('esquinaMixAge18')!=='yes'){gate.hidden=false;document.body.style.overflow='hidden'}
$('yes').onclick=function(){save('esquinaMixAge18','yes');gate.hidden=true;document.body.style.overflow=''};
$('no').onclick=function(){$('deny').hidden=false};

/* Catálogo */
function render(){
  var list=catalog.filter(function(x){
    var okCat=cat==='todos'||(cat==='promo'?x.promo:x.cat===cat);
    return okCat&&norm(x.n).indexOf(norm(term))>-1});
  var g=$('grid');g.textContent='';
  if(!list.length){g.innerHTML='<p class="feat__empty">Nada encontrado. Tente outra busca.</p>';return}
  list.forEach(function(x){
    var c=document.createElement('article');c.className='prod-card';
    c.innerHTML='<div class="prod-filete"></div>'+(x.promo?'<span class="prod-tag">Promo</span>':'')+'<div class="prod-img"><img src="assets/logo.webp" alt="" width="120" height="123" loading="lazy"></div><p class="prod-cat"></p><h3 class="prod-name"></h3><div class="prod-price"></div><button class="prod-buy">Comprar →</button>';
    c.querySelector('.prod-cat').textContent=names[x.cat];c.querySelector('.prod-name').textContent=x.n;c.querySelector('.prod-price').textContent=brl(x.p);
    c.querySelector('.prod-buy').onclick=function(){cart[x.id]=(cart[x.id]||0)+1;sync(true)};
    g.appendChild(c)})}

/* Sacola */
function sync(open){
  var n=0,t=0,ul=$('items');ul.textContent='';
  catalog.forEach(function(x){var q=cart[x.id];if(!q)return;n+=q;t+=q*x.p;
    var li=document.createElement('li');
    li.innerHTML='<span></span><b></b><div class="q"><button aria-label="Menos">−</button><span>'+q+'</span><button aria-label="Mais">+</button></div>';
    li.children[0].textContent=x.n;li.children[1].textContent=brl(q*x.p);
    var b=li.querySelectorAll('button');
    b[0].onclick=function(){cart[x.id]--;if(cart[x.id]<1)delete cart[x.id];sync()};
    b[1].onclick=function(){cart[x.id]++;sync()};
    ul.appendChild(li)});
  $('badge').textContent=n;$('total').textContent=brl(t);$('send').disabled=!n;
  save('emCart',JSON.stringify(cart));
  if(open)toggle(true)}
function toggle(o){$('drawer').hidden=!o;$('veil').hidden=!o}
$('cartBtn').onclick=function(){toggle(true)};
$('closeCart').onclick=$('veil').onclick=function(){toggle(false)};
$('send').onclick=function(){
  var l=['*Pedido — Esquina Mix*'],t=0;
  catalog.forEach(function(x){var q=cart[x.id];if(q){l.push(q+'x '+x.n+' — '+brl(q*x.p));t+=q*x.p}});
  l.push('*Total: '+brl(t)+'*');
  var m=document.querySelector('meta[name="esquina-whatsapp"]'),num=((m&&m.content)||'').replace(/\D/g,'');
  window.open('https://wa.me/'+num+'?text='+encodeURIComponent(l.join('\n')),'_blank','noopener')};

/* Navegação e busca */
function setCat(c){cat=c;
  [].forEach.call(document.querySelectorAll('#nav button'),function(x){x.classList.toggle('on',x.dataset.cat===c&&c!=='todos'?true:(c==='todos'&&x.textContent.trim()==='Início'))});
  [].forEach.call($('chips').children,function(x){x.classList.toggle('is-active',x.dataset.cat===c)});
  render()}
$('nav').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;setCat(b.dataset.cat);document.getElementById('cardapio').scrollIntoView()});
$('chips').addEventListener('click',function(e){var b=e.target.closest('button');if(b)setCat(b.dataset.cat)});
$('q').addEventListener('input',function(){term=this.value;render()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});

/* Ranking, marcas e avaliações — EDITE os dados abaixo */
var topIds=[1,2,4,5,3,6,9,10];
var brands=['Heineken','Brahma','Skol','Red Bull','Jack Daniel\u2019s','Absolut','Zomo','Ballantine\u2019s'];
var reviews=[]; /* ex.: {n:'Nome',t:'há 1 semana',x:'Texto da avaliação'} */
(function(){
  var tr=$('rankTrack');
  topIds.forEach(function(id,i){var x=catalog.filter(function(c){return c.id===id})[0];if(!x)return;
    var a=document.createElement('button');a.className='rank-card';
    a.innerHTML='<b class="rank-n"></b><img src="assets/logo.webp" alt="" width="64" height="65" loading="lazy"><span class="rank-i"><small></small><strong></strong><em></em></span>';
    a.querySelector('.rank-n').textContent=('0'+(i+1)).slice(-2);a.querySelector('small').textContent=names[x.cat];
    a.querySelector('strong').textContent=x.n;a.querySelector('em').textContent=brl(x.p);
    a.onclick=function(){cart[x.id]=(cart[x.id]||0)+1;sync(true)};tr.appendChild(a)});
  var d=0,sx=0,sl=0;
  tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;d=1;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('is-grabbing')});
  window.addEventListener('pointermove',function(e){if(d)tr.scrollLeft=sl-(e.clientX-sx)});
  window.addEventListener('pointerup',function(){d=0;tr.classList.remove('is-grabbing')});
  var bt=$('brandsT');brands.forEach(function(n){var s=document.createElement('span');s.textContent=n;bt.appendChild(s)});
  /* letreiros: deslizam para a esquerda em loop contínuo; pausam com mouse/toque */
  function slide(track){var box=track.parentNode,base=[].slice.call(track.children),need=Math.max(window.screen.width||0,box.offsetWidth);
    for(var i=0;i<30&&track.getBoundingClientRect().width<need;i++)base.forEach(function(k){track.appendChild(k.cloneNode(true))});
    [].slice.call(track.children).forEach(function(k){var c=k.cloneNode(true);c.setAttribute('aria-hidden','true');track.appendChild(c)});
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
render();sync();
})();
