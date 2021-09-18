import { List } from "./board.entity";

class BoardsRepository {
  private lists: List[];
  constructor(lists: List[]) {
    this.lists = lists;
  }

  findListById = (listId: string) => {
    return this.lists.find((list) => list.id === listId);
  };

  addList = (name: string) => {
    const newList = {
      id: Date.now().toString(),
      name,
      cards: [],
    };
    this.lists = [...this.lists, newList];
    return this.getLists();
  };

  addCard = (listId: string, name: string) => {
    const newCard = {
      id: Date.now().toString(),
      name,
    };
    const targetList = this.findListById(listId);
    if (targetList) {
      targetList.cards = [...targetList.cards, newCard];
    }
    return this.getLists();
  };

  updateLists = (lists: List[]) => {
    this.lists = lists;
    return this.getLists();
  };

  getLists = () => {
    return this.lists;
  };
}

export default BoardsRepository;
