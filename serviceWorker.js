// Install a service worker
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/fallback.json',
    '/css/main.css',
    '/js/main.js',
    '/js/jquery.min.js',
    '/images/logo.png'
];

self.addEventListener('install', function(event){
    //Perform install stepz
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(caches){
            console.log('in install serviceworker.... cache opened !');
            return caches.addAll(urlsToCache);
        })
    );
});

//custome fetch
self.addEventListener('fetch', function(event){

  var request = event.request
  var url = new URL (request.url)


  //memisahkan request API dan Internal
  if(url.origin === location.origin){
    event.respondWith(
      caches.match(request).then(function(response){
        return response || fetch(request)
      })
    )
  }else{
    event.respondWith(
      caches.open('products-cache').then(function(cache){
        return fetch(request).then(function(liveResponse){
          cache.put(request, liveResponse.clone())
          console.log(liveResponse);
          return liveResponse
        }).catch(function(){
          return caches.match(request).then(function(response){
            if(response) return response
            return caches.match('/fallback.json')
          })
        })
      })
    )
  }
});

//default fetch
// self.addEventListener('fetch', function(event){
//     event.respondWith(
//       caches.match(event.request).then(function(response){
//         if(response){
//           return response;
//         }
//         return fetch(event.request);
//     )
//   });
// })

// Update a service worker
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName != CACHE_NAME
                }).map(function(cacheName){
                    return caches.delete(cacheName)
                })
            )
        })
    );
});
