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
  $('title').textContent=names[cat];
  var g=$('grid');g.textContent='';
  if(!list.length){g.innerHTML='<p class="empty">Nada encontrado. Tente outra busca.</p>';return}
  list.forEach(function(x){
    var c=document.createElement('article');c.className='card';
    c.innerHTML='<small></small><h3></h3><div class="p"></div><button>Adicionar</button>';
    c.children[0].textContent=names[x.cat];c.children[1].textContent=x.n;c.children[2].textContent=brl(x.p);
    c.children[3].onclick=function(){cart[x.id]=(cart[x.id]||0)+1;sync(true)};
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
$('nav').addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  cat=b.dataset.cat;
  [].forEach.call($('nav').children,function(x){x.classList.toggle('on',x===b)});
  render();document.getElementById('cardapio').scrollIntoView()});
$('q').addEventListener('input',function(){term=this.value;render()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
render();sync();
})();
