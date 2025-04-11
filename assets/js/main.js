document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("vid");

  if (!video) {
    alert("Video element not found!");
    return;
  }

  // iOS requires user interaction before getUserMedia is allowed
  const initCamera = () => {
    const mediaDevices = navigator.mediaDevices;

    if (!mediaDevices || !mediaDevices.getUserMedia) {
      alert("getUserMedia not supported on this browser.");
      return;
    }

    mediaDevices.getUserMedia({
      video: {
        facingMode: { exact: "environment" } // iOS sometimes prefers `exact`
      },
      audio: false
    })
    .then((stream) => {
      video.srcObject = stream;

      // iOS requires muted and playsinline attributes in HTML
      video.onloadedmetadata = () => {
        video.play().catch((err) => {
          console.error("Autoplay error:", err);
        });
      };
    })
    .catch((err) => {
      console.error("Error accessing media devices.", err);
      alert("Camera access error: " + err.message);
    });
  };

  // Wait for user interaction to initiate camera on iOS
  video.addEventListener("click", initCamera, { once: true });
});
