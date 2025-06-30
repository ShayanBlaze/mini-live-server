const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener("message", (event) => {
  if (event.data === "reload") {
    console.log("♻️ Reload triggered from server");
    location.reload();
  }
});
