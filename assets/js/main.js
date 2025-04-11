// document.addEventListener("DOMContentLoaded", () => {
//   const video = document.getElementById("vid");
  
//   if (!video) {
//       alert("Video element not found!");
//       return;
//   }

//   const mediaDevices = navigator.mediaDevices;

//   mediaDevices.getUserMedia({
//       video: { facingMode: { ideal: "environment" } }, // Use back camera
//       audio: true,
//   })
//   .then((stream) => {
//       video.srcObject = stream;
//       video.onloadedmetadata = () => {
//           video.play();
//       };
//   })
//   .catch((err) => {
//       console.error("Error accessing media devices.", err);
//       alert("Error accessing camera/microphone: " + err.message);
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("vid");

  if (!video) {
    alert("Video element not found!");
    return;
  }

  const startCamera = () => {
    const constraints = {
      video: {
        facingMode: { ideal: "environment" } // Try to use back camera
      },
      audio: false // Set to true only if needed
    };

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera not supported in this browser.");
      return;
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;

        // iOS autoplay fix
        video.onloadedmetadata = () => {
          video.play().catch((err) => {
            console.warn("Video play blocked:", err);
          });
        };
      })
      .catch((err) => {
        console.error("Camera error:", err);
        alert("Could not access the camera: " + err.message);
      });
  };

  // For iOS Safari, start camera on user interaction
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    video.addEventListener("click", startCamera, { once: true });
    alert("Tap the video to start camera (iOS requirement)");
  } else {
    startCamera(); // Auto start for other devices
  }
});
