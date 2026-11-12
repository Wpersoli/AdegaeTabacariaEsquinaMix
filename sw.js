/* Service worker do Esquina Mix: deixa o site instalavel e abre mesmo com internet ruim.
   Aumente VERSAO a cada publicacao grande para renovar o cache. */
var VERSAO='esquina-mix-v1',BASE=['./','index.html','styles.css','app.js','manifest.webmanifest','assets/logo.webp','assets/icon-192.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSAO).then(function(c){return c.addAll(BASE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSAO}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  var estatico=/\.(?:webp|png|jpg|jpeg|ico|svg|woff2?)$/i.test(u.pathname);
  if(estatico){ /* imagens: cache primeiro */
    e.respondWith(caches.match(r).then(function(h){return h||fetch(r).then(function(res){if(res.ok){var c=res.clone();caches.open(VERSAO).then(function(ca){ca.put(r,c)})}return res})}));return}
  /* pagina, CSS e JS: rede primeiro, cache se estiver sem internet */
  e.respondWith(fetch(r).then(function(res){if(res.ok){var c=res.clone();caches.open(VERSAO).then(function(ca){ca.put(r,c)})}return res}).catch(function(){return caches.match(r).then(function(h){return h||caches.match('index.html')})}))});
