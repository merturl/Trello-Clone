import http from "http";
import WebSocket from "ws";

class Socket {
  private socket: WebSocket.Server;
  constructor(server: http.Server) {
    this.socket = new WebSocket.Server({ server });
    this.socket.addListener("connection", (ws: WebSocket, req) => {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      // wss.clients.forEach((client) => {
      //   client.send("hello");
      // });
      ws.on("message", (message) => {
        // 클라이언트로부터 메시지 수신 시
        console.log(message.toString());
      });

      ws.on("error", (err) => {
        // 에러 발생 시
        console.error(err);
      });
      ws.on("close", () => {
        // 연결 종료 시
      });
    });
  }
}

export default Socket;
