import Card from "./components/card/Card.js";
import Layout from "./components/common/Layout.js";
import Component from "./components/core/Component.js";
import Form from "./components/form/Form.js";
import List from "./components/list/List.js";
import { CardInfo, ListInfo } from "./types/global.js";

interface Props {
  webSocket: WebSocket;
}

interface State {
  lists: ListInfo[];
  addCardFormOpenId: string;
  addListFormOpen: boolean;
  draggedCard: CardInfo | null;
  draggedCardListId: string | null;
}

class App extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.state = {
      lists: [
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
      ],
      addListFormOpen: false,
      addCardFormOpenId: "",
      draggedCard: null,
      draggedCardListId: null,
    };
    this.$target = document.createElement("div");
    this.$parent.appendChild(this.$target);
    this.render();
    this.$target.addEventListener("mousedown", this.handleOnClickOutside);
  }

  render = () => {
    this.$target.innerHTML = "";
    this.$target.className = "boards";
    const { lists, addListFormOpen, addCardFormOpenId } = this.state;

    lists.map((list) => {
      const listWrapComponent = new Layout(this.$target, {
        className: "list-wrap",
      });
      const listComponent = new List(listWrapComponent.$target, {
        className: "list",
        list,
        onDragOver: this.handleDragOver,
      });
      const cardContainer = new Layout(listComponent.$target, {
        className: "card-container",
      });
      list.cards.map((card) => {
        new Card(cardContainer.$target, {
          className: "card",
          listId: list.id,
          card,
          onDragStart: this.handleDragStart,
          onDragEnd: this.handleDragEnd,
        });
      });
      const CardFormWrapComponent = new Layout(listComponent.$target, {
        className: "add-card-wrap",
      });
      new Form(CardFormWrapComponent.$target, {
        open: list.id === addCardFormOpenId,
        className: "add-card",
        placeholder: "Add a card",
        onSubmit: (name: string) => this.handleAddCard(list.id, name),
        onOpenForm: () => {
          this.setState({ ...this.state, addCardFormOpenId: list.id });
        },
        onCloseForm: this.handleCloseCardForm,
      });
    });
    const ListFormWrapComponent = new Layout(this.$target, {
      className: "add-list-wrap",
    });
    new Form(ListFormWrapComponent.$target, {
      open: addListFormOpen,
      className: "list add-list",
      placeholder: "Add another list",
      onSubmit: this.handleAddList,
      onOpenForm: this.handleOpenAddListForm,
      onCloseForm: this.handleCloseAddListForm,
    });
  };

  handleDragStart = (draggedCardListId: string, draggedCard: CardInfo) => {
    requestAnimationFrame(() => {
      this.setState({
        ...this.state,
        draggedCard,
        draggedCardListId,
      });
    });
  };

  handleDragEnd = () => {
    this.setState({
      ...this.state,
      draggedCard: null,
      draggedCardListId: null,
    });
  };

  handleDragOver = (
    draggedOverCardId: string | null,
    draggedOverList: ListInfo
  ) => {
    const { lists } = this.state;
    const { draggedCardListId, draggedCard } = this.state;

    if (!draggedCardListId || !draggedCard) return;

    const draggedOverListIndex = lists.findIndex(
      (list) => list.id === draggedOverList.id
    );
    const dscCard = lists[draggedOverListIndex].cards.find(
      (card) => card.id === draggedCard.id
    );
    if (dscCard) {
      if (draggedOverCardId === dscCard.id) return;
      const draggedOverCardIndex = lists[draggedOverListIndex].cards.findIndex(
        (card) => card.id === draggedOverCardId
      );
      const draggedCardIndex = lists[draggedOverListIndex].cards.findIndex(
        (card) => card.id === dscCard.id
      );

      this.move(
        lists[draggedOverListIndex].cards,
        draggedCardIndex,
        draggedOverCardIndex
      );
      this.setState({ ...this.state, lists });
    } else {
      lists.map((list) => {
        list.cards = list.cards.filter((card) => card.id !== draggedCard.id);
      });
      lists[draggedOverListIndex].cards.splice(0, 0, draggedCard);
      this.setState({ ...this.state, lists });
    }
  };

  move<T>(array: Array<T>, from: number, to: number) {
    var element = array[from];
    array.splice(from, 1);
    array.splice(to, 0, element);
  }

  handleOnClickOutside = (e: MouseEvent) => {
    const target = <HTMLDivElement>e.target;

    if (target) {
      if (!target.closest(".list")) {
        this.handleCloseCardForm();
        this.handleCloseAddListForm();
      }
    }
  };

  handleAddList = (name: string) => {
    const list: ListInfo = {
      id: Date.now().toString(),
      name,
      cards: [],
    };

    this.setState({ ...this.state, lists: [...this.state.lists, list] });
  };

  handleAddCard = (id: string, name: string) => {
    const { lists } = this.state;
    const card: CardInfo = {
      id: Date.now().toString(),
      name,
    };

    const list = lists.find((list) => list.id === id);
    if (list) {
      list.cards = [...list.cards, card];
      this.setState({ ...this.state, lists });
    }
  };

  handleCloseCardForm = () => {
    this.setState({ ...this.state, addCardFormOpenId: "" });
  };

  handleOpenAddListForm = () => {
    this.setState({ ...this.state, addListFormOpen: true });
  };

  handleCloseAddListForm = () => {
    this.setState({ ...this.state, addListFormOpen: false });
  };
}

export default App;
