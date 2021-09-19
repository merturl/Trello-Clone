import express, { Router } from "express";
import path from "path";

const FRONTEND_BUILD = path.join(__dirname, "../../client/public");

export interface Controller {
  path: string;
  router: Router;
}

class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.static(FRONTEND_BUILD));
  }

  private initializeControllers(controllers: Controller[]) {
    const router = Router();

    router.get("/", (req, res) => {
      res.sendFile("index.html");
    });

    controllers.forEach((controller) => {
      router.use(controller.router);
    });

    this.app.use("/", router);
  }
}

export default App;
