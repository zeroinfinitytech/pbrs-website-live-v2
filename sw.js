const V='pbrs-8891d1d7e8',CORE=['./','a-8891d1d7e8.js'],WARM=["img/d4e32a6ecbb1.jpg","img/8f94834da772.jpg","img/f8269044dc2e.jpg","img/1b373a7bfe56.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()).then(()=>caches.open(V).then(c=>Promise.all(WARM.map(u=>c.match(u).then(r=>r||fetch(u).then(x=>x.ok&&c.put(u,x))).catch(()=>0))))))});
const swr=(req)=>caches.open(V).then(c=>c.match(req).then(hit=>{const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(req,r.clone());return r}).catch(()=>hit);return hit||net}));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin===location.origin&&/\/img\//.test(u.pathname)){e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x}))));return}
if(u.origin===location.origin&&(r.mode==='navigate'||/\.js$/.test(u.pathname))){e.respondWith(swr(r));return}
if(/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net/.test(u.host)){e.respondWith(swr(r))}});