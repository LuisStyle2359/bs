// Offline-Modus: Mit Internet wird immer die neueste Version geladen und zwischengespeichert,
// ohne Internet kommt die zuletzt geladene Version aus dem Zwischenspeicher.
const CACHE = "lernportal-v2";

const DATEIEN = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/style.css",
  "assets/app.js",
  "assets/vendor/marked.min.js",
  "assets/icons/icon-192.png",
  "daten/config.js",
  ...Array.from({ length: 15 }, (_, i) => `daten/lf${String(i + 1).padStart(2, "0")}.js`),
  "daten/test-bestandskonten.js",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(DATEIEN)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((antwort) => {
        if (antwort.ok || antwort.type === "opaque") {
          const kopie = antwort.clone();
          caches
            .open(CACHE)
            .then((cache) => cache.put(event.request, kopie))
            .catch(() => {});
        }
        return antwort;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true })),
  );
});
