//Verificar si el navegador web soporta service workers
if ("serviceWorker" in navigator) {

    //Llamar el metodo register para registrar un SW
    //El parametro /sw.js es la ruta del archivo SW
    navigator.serviceWorker
    .register("./sw.js")
     
            //then se executa si el registro fue exitoso 
            //reg es un objeto tipo serviceworkerregistration con información del SW
            .then((reg)=> console.log("Service Worker registrado:", reg))
    
            //catch se ejecuta si ocurre un error en el registro
            //err contiene el mensaje o detalle del error 
            .catch((error) => console.log("Error al registrar el SW:", err));
    }
    
    //Agregamos un evento clic al boton check
    document.getElementById("check").addEventListener("click", () =>
    {
        //Verificar si el SW controla la pagina actual
        if (navigator.serviceWorker.controller) {
            alert("El service worker aun no esta activo.");
        }
    });

//Area de notificacion
if (Notification.permission === "default") {
    Notification.requestPermission().then((perm) => {6
        if (perm === "granted") {
            console.log("Permiso de notificacion concedido.");
        }
    });
}