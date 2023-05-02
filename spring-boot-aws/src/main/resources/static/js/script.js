const videoElement = document.getElementById("video");
const photoButton = document.getElementById("photo-button");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const microButton = document.getElementById("micro-button")

photoButton.addEventListener("click", () => {
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "foto.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});

microButton.addEventListener( "click",() =>
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).catch((error) => console.log(error))
)

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        videoElement.srcObject = stream;
    })
    .catch((error) => {
        console.error("Error al obtener el acceso a la cámara", error);
    });
