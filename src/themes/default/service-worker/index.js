/* eslint-disable */
const isGoogleSpeed = window && window.navigator && window.navigator.userAgent.indexOf('Speed Insights') === 0
self.addEventListener("activate", event => {
  if (isGoogleSpeed) return;
  console.info("clearing old cache");
  event
    .waitUntil(
      caches
        .keys()
        .then(keyList => {
          return Promise.all(
            keyList.map(key => {
              return caches.delete(key);
            })
          );
        })
        .then(self.clients.claim())
        .then(async () => {
          const tabs = await self.clients.matchAll({ type: "window" });
          console.log("refreshing sw in all tabs");
          tabs.forEach(tab => {
            // ...and refresh each one of them
            tab.navigate(tab.url);
          });
        })
    )
});

self.addEventListener("install", function(event) {
  if (isGoogleSpeed) return;
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});
