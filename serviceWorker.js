const cacheName = "my-pwa-cache";

// FOR PWA INSTALLABILITY
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll([
            "/",
            "index.html",
            "index.js",
            "styles.css",
            "manifest.json"
        ]);
    }));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((res) => {
        return res || fetch(event.request).then((res2) => {
            return caches.open(cacheName).then((cache) => {
                cache.put(event.request, res2.clone());
                return res2;
            });
        });
    }));
});