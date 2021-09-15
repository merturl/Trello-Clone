import App from "./app";
import http from "http";
import Socket from "./socket";

async function startServer() {
  const port = process.env.PORT ?? 3000;
  const app = new App([]).getServer();
  const server = http.createServer(app);
  new Socket(server);

  server.listen(port);
}

startServer();
