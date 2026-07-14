const CACHE_NAME = 'wildlife-triangulation-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // 本地 Leaflet（用 get_leaflet.ps1 下載到 vendor/）
  './vendor/leaflet/leaflet.css',
  './vendor/leaflet/leaflet.js',
  './vendor/leaflet/images/marker-icon.png',
  './vendor/leaflet/images/marker-icon-2x.png',
  './vendor/leaflet/images/marker-shadow.png',
  './vendor/leaflet/images/layers.png',
  './vendor/leaflet/images/layers-2x.png',
  // CDN 備援（本地檔缺少時仍可離線）
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  // 讓新版 service worker 不用等舊分頁全部關閉就能生效
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      // 逐一快取：個別檔案失敗（例如 vendor 尚未下載）不會讓整個快取失敗
      Promise.all(
        urlsToCache.map(url => cache.add(url).catch(() => null))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // 立即接管已開啟的頁面
  );
});
