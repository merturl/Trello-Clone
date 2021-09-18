import { List } from "./board.entity";
import BoardsRepository from "./board.repository";

export class BoardService {
  constructor(private readonly boardRepository: BoardsRepository) {}
  addList(name: string) {
    return this.boardRepository.addList(name);
  }
  addCard(listId: string, name: string) {
    return this.boardRepository.addCard(listId, name);
  }

  getLists() {
    return this.boardRepository.getLists();
  }

  updateLists(lists: List[]) {
    return this.boardRepository.updateLists(lists);
  }
}
