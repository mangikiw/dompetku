const CACHE_NAME = 'aturuang-v1';
const urlsToCache = [
  '/', // Pastikan mencakup root URL
  '/index.html',
  '/css/style.css', // Ganti sesuai path file CSS Anda
  '/js/main.js',    // Ganti sesuai path file JS Anda
  '/images/icon-192x192.png', // Tambahkan semua aset penting
  // Tambahkan semua file yang dibutuhkan saat offline
];

// 1. Install Event: Menyimpan aset ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch Event: Melayani dari cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - kembalikan response
        if (response) {
          return response;
        }
        // Jika tidak ada di cache, lakukan fetch (ambil dari jaringan)
        return fetch(event.request);
      })
  );
});

// 3. Activate Event: Menghapus cache lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Hapus cache lama
          }
        })
      );
    })
  );
});
