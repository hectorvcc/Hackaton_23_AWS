/* Ahora vamos a pedir permiso al usuario para poder acceder a la cámara*/

navigator.mediaDevices.getUserMedia({
    video: true
}).then((stream) => {
    /* A continuación seleccionamos el elemento ID de nuestra etiqueta video*/
    Camara.srcObjetc = stream
}).catch((error) => console.log(error))

navigator.mediaDevices.getUserMedia({
    audio: true
}).then((stream) => {
    /* A continuación seleccionamos el elemento ID de nuestra etiqueta video*/
    Micro.srcObjetc = stream
}).catch((error) => console.log(error))