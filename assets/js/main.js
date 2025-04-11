
document.addEventListener("DOMContentLoaded", () => {
    let video = document.getElementById("vid");
    let mediaDevices = navigator.mediaDevices;

    mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }, // Use back camera
        audio: true,
    })
    .then((stream) => {
        // Changing the source of video to current stream.
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
    })
    .catch(alert);
});