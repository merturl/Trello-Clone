import http from "http";
import WebSocket from "ws";
import {
  List,
  MessageDTO,
  NewCard,
  NewList,
  NewLists,
} from "./board/board.entity";
import BoardsRepository from "./board/board.repository";
import { BoardService } from "./board/board.service";

const lists = [
  {
    id: "asdqwdfr",
    name: "To Do",
    cards: [{ id: "qwasdq", name: "패치 하기" }],
  },
  {
    id: "qwesadqwe",
    name: "Doing",
    cards: [
      {
        id: "0qaszxwe",
        name: "시험 보기",
      },
    ],
  },
  {
    id: "drthfgh",
    name: "Done",
    cards: [
      { id: "asda0", name: "아침 식사" },
      { id: "afthas0", name: "저녁 운동" },
    ],
  },
  {
    id: "xyurhf",
    name: "Mayby",
    cards: [],
  },
];

class Socket {
  private socket: WebSocket.Server;
  private boardService = new BoardService(new BoardsRepository(lists));

  constructor(server: http.Server) {
    this.socket = new WebSocket.Server({ server });
    this.socket.addListener("connection", this.handleConnection);
    this.socket.addListener("error", this.handleError);
    this.socket.addListener("close", this.handleClose);
  }

  handleClose = () => {
    console.log("Close");
  };

  handleError = () => {
    console.log("Error, what!!!!");
  };

  handleConnection = (client: WebSocket, request: http.IncomingMessage) => {
    client.send(JSON.stringify(this.boardService.getLists()));
    client.addEventListener("message", this.handleClientMessage);
    client.addEventListener("error", this.handleClientError);
    client.addEventListener("close", this.handleClientClose);
  };

  handleClientMessage = (event: {
    data: any;
    type: string;
    target: WebSocket;
  }) => {
    const message = JSON.parse(event.data.toString()) as MessageDTO;
    switch (message.action) {
      case "add": {
        if (message.type === "list") {
          const target = <NewList>message.target;
          const lists = this.boardService.addList(target.name);
          this.handleBrodcast(lists);
          break;
        } else if (message.type === "card") {
          const target = <NewCard>message.target;
          const lists = this.boardService.addCard(target.listId, target.name);
          this.handleBrodcast(lists);
          break;
        }
      }
      case "update": {
        const target = <NewLists>message.target;
        const lists = this.boardService.updateLists(target.lists);
        this.handleBrodcast(lists);
        break;
      }
      default: {
        const lists = this.boardService.getLists();
        this.handleBrodcast(lists);
        break;
      }
    }
  };
  handleClientError = () => {};
  handleClientClose = () => {};
  handleBrodcast = (lists: List[]) => {
    this.socket.clients.forEach((client) => {
      client.send(JSON.stringify(lists));
    });
  };
}

export default Socket;
