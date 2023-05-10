
const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const photoButton = document.querySelector('#photo-button');
const microButton = document.querySelector('#micro-button');
const cameraSwitchButton = document.querySelector('#camera-switch-button');
let currentFacingMode = "environment";

console.log(cameraSwitchButton);
console.log(microButton);

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error(`Failed to get user media: ${error}`);
    });


// Para permitir el cambio de camara delantera a trasera y viceversa
cameraSwitchButton.addEventListener("click", () => {
    if (currentFacingMode === "user") {
        currentFacingMode = "environment";
    } else {
        currentFacingMode = "user";
    }
    initCamera();
});

//Pedir permisos para usar la camara
function initCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } })
        .then((stream) => {
            videoElement.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error al obtener el acceso a la cámara", error);
        });
}

initCamera();

//Pedir permisos para usar el micro
microButton.addEventListener( "click",() =>
    navigator.mediaDevices.getUserMedia({
        audio: true
    }) .then((stream) => {
        microButton.srcObject = stream;
    }).catch((error) => console.log(error))
)

photoButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/jpeg', 1.0);

});
