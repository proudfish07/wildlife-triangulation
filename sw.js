const CACHE_NAME = 'wildlife-triangulation-v4';
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
  const req = event.request;

  // HTML／頁面導覽採「網路優先」：有網路一定拿最新版，離線才退回快取
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then(r => r || caches.match('./index.html'))
        )
    );
    return;
  }

  // 其他資源（圖磚、程式庫等）維持快取優先，確保離線可用
  event.respondWith(
    caches.match(req).then(response => response || fetch(req))
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
