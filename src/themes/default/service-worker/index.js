/* eslint-disable */
self.addEventListener("activate", event => {
  console.info("CLEARING OLD CACHE");
  event
    .waitUntil(
      caches
        .keys()
        .then(keyList => {
          return Promise.all(
            keyList.map(key => {
              console.log('delete ' + cacheName)
              return caches.delete(key);
            })
          );
        })
        .then(self.clients.claim())
        .then(async () => {
          const tabs = await self.clients.matchAll({ type: "window" });
          console.log("REFRESHING SW IN ALL TABS");
          tabs.forEach(tab => {
            tab.navigate(tab.url);
          });
        })
    )
});

self.addEventListener("install", function(event) {
  console.log('APPLICATION INSTALLING')
});
