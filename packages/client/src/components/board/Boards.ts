import Card from "../card/Card.js";
import Layout from "../common/Layout.js";
import Component from "../core/Component.js";
import Form from "../form/Form.js";
import List from "../list/List.js";
import { move } from "../../lib/utils.js";
import { CardInfo, ListInfo } from "../../types/global.js";

interface Props {
  webSocket: WebSocket;
}

interface State {
  lists: ListInfo[];
  addCardFormOpenId: string;
  addListFormOpen: boolean;
}

class Board extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.state = {
      lists: [],
      addListFormOpen: false,
      addCardFormOpenId: "",
    };
    this.$target = document.createElement("div");
    this.$parent.appendChild(this.$target);
    this.render();
    this.$target.addEventListener("mousedown", this.handleOnClickOutside);
    this.props.webSocket.addEventListener("message", (event) => {
      const lists: ListInfo[] = JSON.parse(event.data);
      this.setState({ ...this.state, lists });
    });
  }

  render = () => {
    this.$target.innerHTML = "";
    this.$target.className = "board";
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
          onDragOver: this.handleDragOver,
        });
      });
      const CardFormWrapComponent = new Layout(listComponent.$target, {
        className: "add-card-wrap",
      });
      new Form(CardFormWrapComponent.$target, {
        open: list.id === addCardFormOpenId,
        className: "add-card",
        placeholder: "Add a card",
        type: "card",
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
      className: "add-list",
      type: "list",
      placeholder: "Add another list",
      onSubmit: this.handleAddList,
      onOpenForm: this.handleOpenAddListForm,
      onCloseForm: this.handleCloseAddListForm,
    });
  };

  handleDragOver = (
    dragStartCard: CardInfo,
    dropableCardId: string | null,
    dropableListId: string
  ) => {
    const { lists } = this.state;
    const dropableListIndex = lists.findIndex(
      (list) => list.id === dropableListId
    );
    const dscCard = lists[dropableListIndex].cards.find(
      (card) => card.id === dragStartCard.id
    );

    if (dscCard) {
      if (dropableCardId === dscCard.id) return;
      const dropableCardIndex = lists[dropableListIndex].cards.findIndex(
        (card) => card.id === dropableCardId
      );
      const draggedCardIndex = lists[dropableListIndex].cards.findIndex(
        (card) => card.id === dscCard.id
      );
      move(lists[dropableListIndex].cards, draggedCardIndex, dropableCardIndex);
      this.props.webSocket.send(
        JSON.stringify({
          action: "update",
          type: "list",
          target: { lists },
        })
      );
    } else {
      lists.map((list) => {
        list.cards = list.cards.filter((card) => card.id !== dragStartCard.id);
      });
      lists[dropableListIndex].cards.splice(0, 0, dragStartCard);
      this.props.webSocket.send(
        JSON.stringify({
          action: "update",
          type: "list",
          target: { lists },
        })
      );
    }
  };

  handleOnClickOutside = (e: MouseEvent) => {
    const target = <HTMLDivElement>e.target;

    if (target) {
      if (!target.closest(".list") && !target.closest(".add-list")) {
        this.handleCloseCardForm();
        this.handleCloseAddListForm();
      }
    }
  };

  handleAddList = (name: string) => {
    const newList = { name };

    this.props.webSocket.send(
      JSON.stringify({
        action: "add",
        type: "list",
        target: newList,
      })
    );
  };

  handleAddCard = (id: string, name: string) => {
    const { lists } = this.state;
    const list = lists.find((list) => list.id === id);
    if (list) {
      const newCard = { listId: id, name };
      this.props.webSocket.send(
        JSON.stringify({
          action: "add",
          type: "card",
          target: newCard,
        })
      );
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

export default Board;
