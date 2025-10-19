self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open('v3')
        .then(cache => {
            cache.addAll([
                './',                  
                './script.js'
            ]);
            console.log("Assets cached.");
        })
        .catch(err => console.log("Could not cache."))
    )
});

self.addEventListener('fetch', event => {
    console.log("INTERCEPTED");

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                console.log("V3 the request: ", event.request);
                console.log("V3 got the response...", response);

                // Ejemplo1
                return response || fetch(event.request);

                // Ejemplo2
                // if (event.request.url === 'TU ENLACE') {
                //     return fetch('EL ENLACE DE UNA IMAGEN EN LA WEB');
                // } else {
                //     return response;
                // }

                // Ejemplo3
                // if (event.request.url === 'EL ENLACE DE TU IMAGEN DESDE XAMPP') {
                //     return fetch('EL ENLACE DE UNA IMAGEN EN LA WEB')
                //         .then(res => {
                //             return caches.open('v1')
                //             .then(cache => {
                //                 cache.put(event.request, res.clone());
                //                 return res;
                //             })
                //         });
                // } else {
                //     return response;
                // }

                //Ejemplo4
                // return fetch('https://www.perplexity.ai/')   //****BAD EXMPL
                // return fetch('https://jsonplaceholder.typicode.com/todos/1')  //****GOOD EXMPL
                
                // Ejemplo5
                // return new Response('Hola Mundo');

            })
            .catch(err => {
                console.log("Could not find matching request.");
                return null;
            })
    );
});


// Elimina caché con código
// self.addEventListener('activate', event => {
//     event.waitUntil(
//         caches.keys()
//         .then(keys => {
//             keys.forEach(key => {
//                 if (key === 'v3') caches.delete(key);
//             });
//         })
//     );
// });