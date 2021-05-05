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
              return caches.delete(key);
            })
          );
        })
    )
});

self.addEventListener("install", function(event) {
  console.log('APPLICATION INSTALLING')
});
