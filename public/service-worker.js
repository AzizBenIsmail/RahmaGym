const CACHE_NAME = 'rahma-service-v1';
const API_CACHE = 'rahma-api-v1';
const IMAGE_CACHE = 'rahma-images-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.css',
  '/src/index.css',
  '/src/darkmode.css'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log('Cache addAll error:', err);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE && cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event with advanced caching strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Images - cache first, fallback to network
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE)
        .then((cache) => {
          return cache.match(event.request)
            .then((response) => {
              return response || fetch(event.request)
                .then((fetchResponse) => {
                  if (fetchResponse.ok) {
                    cache.put(event.request, fetchResponse.clone());
                  }
                  return fetchResponse;
                });
            });
        })
        .catch(() => {
          return new Response('Image non disponible', {
            status: 404,
            statusText: 'Not Found'
          });
        })
    );
    return;
  }

  // API calls - network first, fallback to cache
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(API_CACHE)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then((response) => {
              return response || new Response('Données non disponibles', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
    return;
  }

  // Default strategy - cache first, fallback to network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            return caches.match('/index.html');
          });
      })
  );
});

// Handle background sync (optional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      fetch('/api/sync')
        .then((response) => response.json())
        .catch((err) => {
          console.log('Sync error:', err);
        })
    );
  }
});

