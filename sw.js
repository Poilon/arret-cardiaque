// Service worker — hors-ligne + purge auto des anciens caches à chaque déploiement.
// __BUILD__ est remplacé par le SHA du commit au déploiement (voir .github/workflows/deploy.yml),
// donc le nom du cache change à chaque mise en ligne → tous les anciens caches sont supprimés.
var CACHE = "arret-cardiaque-__BUILD__";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg"
];

self.addEventListener("install", function(e){
  self.skipWaiting(); // le nouveau SW n'attend pas la fermeture des onglets
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil((async function(){
    var keys = await caches.keys();
    await Promise.all(keys.filter(function(k){ return k !== CACHE; })
                          .map(function(k){ return caches.delete(k); })); // purge tout le reste
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  var accept = req.headers.get("accept") || "";
  var isHTML = req.mode === "navigate" || accept.indexOf("text/html") !== -1;

  if(isHTML){
    // Network-first : en ligne on a TOUJOURS la dernière version ; hors-ligne → cache.
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put("./index.html", copy); });
        return res;
      }).catch(function(){
        return caches.match(req).then(function(m){ return m || caches.match("./index.html"); });
      })
    );
  } else {
    // Assets : cache-first, avec revalidation en arrière-plan.
    e.respondWith(
      caches.match(req).then(function(hit){
        var net = fetch(req).then(function(res){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
          return res;
        }).catch(function(){ return hit; });
        return hit || net;
      })
    );
  }
});
