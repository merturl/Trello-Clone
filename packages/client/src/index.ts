import App from "./App.js";

const $app = document.getElementById("app");
const webSocket = new WebSocket("ws://localhost:3000");

if ($app) {
  new App($app, {
    webSocket,
  });
}
