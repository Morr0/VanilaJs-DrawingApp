// FOR PWA INSTALLABILITY
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open("my-pwa-cache").then((cache) => {
        return cache.addAll([
            "/",
            "index.html",
            "index.js",
            "styles.css",
            "manifest.json"
        ]);
    }));
});