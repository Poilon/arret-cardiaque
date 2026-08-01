// Service worker suicide — cette PWA a déménagé vers poilon.com/carabin/.
// Il remplace l'ancien service worker, vide ses caches, se désinscrit, puis
// recharge les clients : ils atterrissent sur la page de redirection.
self.addEventListener("install", function (e) { self.skipWaiting(); });

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var clients = await self.clients.matchAll({ type: "window" });
    clients.forEach(function (c) { c.navigate(c.url); });
  })());
});

// Plus aucune interception : tout part au réseau.
