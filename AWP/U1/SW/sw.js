//Nombre del cache actual (identificador unico)
const CACHE_NAME = "mi-app-cache-v1";

//Listar los archivos que se guardaran en cache
const urlsToCache = [
    "./",             // ruta de la raiz
    "./index.html",   // documento raiz
    "./styles.css",   // hoja de estilos (corregido)
    "./app.js",       // script del cliente
    "./logo.png",     // logotipo de canvas
];

//Evento de instalacion (se dispara cuando se instala el sw)
self.addEventListener("install", (event) => {
    console.log("SW: Instalado");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("SW: Archivos cacheados");
            return cache.addAll(urlsToCache);
        })
    );

    //Mostrar notificacion en sistema
    self.registration.showNotification("Service Worker activo.", {
        body: "El cache original se configuro correctamente.",
        icon: "logo.png"
    });
});

//Evento de activacion (se dispara cuando el SW toma el control).
self.addEventListener("activate", (event) => {
    console.log("SW: Activado");

    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("SW: Cache viejo eliminado");
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});

//Evento de interceptacion de peticiones (para cad vez que la app pida un recurso)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        //caches.match() busca un recurso ya en cache
        caches.match(event.request). then((response) => {
            //Si esta en cache se duvuelve una copia guardada
            //Si no esta en cache se hace una peticion normal a la red con fetch()
            return response || fetch(event.request);
        })
    )
})