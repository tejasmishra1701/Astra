// Service Worker placeholder for ASTRA Terminal
// This file exists to prevent 404 errors in development
// For production PWA support, implement proper caching strategies

self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Service worker activated");
});

self.addEventListener("fetch", (event) => {
  // Pass through all requests in development
  event.respondWith(fetch(event.request));
});
