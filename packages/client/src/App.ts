import Card from "./components/card/Card.js";
import Layout from "./components/common/Layout.js";
import Component from "./components/core/Component.js";
import Form from "./components/form/Form.js";
import List from "./components/list/List.js";
import { ListInfo } from "./types/global.js";

interface Props {
  webSocket: WebSocket;
}

interface State {
  lists: ListInfo[];
  addCardFormOpenId: string;
  addListFormOpen: boolean;
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
      });
      const cardContainer = new Layout(listComponent.$target, {
        className: "card-container",
      });
      list.cards.map((card) => {
        new Card(cardContainer.$target, {
          className: "card",
          listId: list.id,
          card,
        });
      });
      const CardFormWrapComponent = new Layout(listComponent.$target, {
        className: "add-card-wrap",
      });
      new Form(CardFormWrapComponent.$target, {
        open: list.id === addCardFormOpenId,
        className: "add-card",
        placeholder: "Add a card",
        onSubmit: (name: string) => {},
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
      onSubmit: (name: string) => {},
      onOpenForm: this.handleOpenAddListForm,
      onCloseForm: this.handleCloseAddListForm,
    });
  };

  handleOnClickOutside = (e: MouseEvent) => {
    const target = <HTMLDivElement>e.target;
    if (target) {
      if (!target.closest(".list")) {
        this.handleCloseCardForm();
        this.handleCloseAddListForm();
      }
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
