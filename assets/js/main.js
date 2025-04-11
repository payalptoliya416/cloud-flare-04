document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("vid");
  
  if (!video) {
      alert("Video element not found!");
      return;
  }

  const mediaDevices = navigator.mediaDevices;

  mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } }, // Use back camera
      audio: true,
  })
  .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
          video.play();
      };
  })
  .catch((err) => {
      console.error("Error accessing media devices.", err);
      alert("Error accessing camera/microphone: " + err.message);
  });
});
