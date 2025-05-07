// Service Worker for Tap-to-Earn Telegram Mini Game
const CACHE_NAME = 'tap-to-earn-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/App.css',
  '/src/index.css'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  self.clients.claim();
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  // Telegram API çağrılarını atlayın
  if (event.request.url.includes('telegram.org')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(fetchResponse => {
            // Başarısız bir yanıt ise yalnızca yanıtı döndür
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            
            // Yanıtı cache'e ekle
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return fetchResponse;
          })
          .catch(error => {
            console.error('Fetch error:', error);
            // Çevrimiçi durumuyla ilgili bir mesaj yayınla
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                client.postMessage({
                  type: 'OFFLINE_MODE',
                  message: 'Çevrimdışı mod - Bazı özellikler devre dışı'
                });
              });
            });
            
            // Offline sayfasına yönlendir veya özel bir hata sayfası göster
            return caches.match('/index.html');
          });
      })
  );
});

// Çevrimiçi durumuna geri dönüldüğünde mesaj gönder
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ONLINE_STATUS') {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'ONLINE_STATUS',
          isOnline: event.data.isOnline
        });
      });
    });
  }
}); 