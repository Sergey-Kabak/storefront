/* eslint-disable */

// Deletion should only occur at the activate event
self.addEventListener('activate', event => {
  console.info('clearing old cache');
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(keyList.map(key => {
          return caches.delete(key);
        }));
      })
      .then(self.clients.claim()))
      .then(async _ => {
        const tabs = await self.clients.matchAll({ type: 'window' })
        console.log('refreshing sw in all tabs')
        tabs.forEach((tab) => {
          // ...and refresh each one of them
          tab.navigate(tab.url)
        })
      })
});

self.addEventListener('install', function (event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});

