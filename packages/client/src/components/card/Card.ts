import { CardInfo } from "../../types/global.js";
import Component from "../core/Component.js";

interface Props {
  className: string;
  card: CardInfo;
  listId: string;
  onDragStart: (draggedCardListId: string, draggedCard: CardInfo) => void;
  onDragEnd: (e: DragEvent) => void;
}

interface State {}

class Card extends Component<Props, State> {
  $target: HTMLDivElement;
  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.$target = document.createElement("div");

    this.$parent.appendChild(this.$target);
    this.render();

    this.$target.addEventListener("dragstart", this.handleDragStart);
    this.$target.addEventListener("dragend", this.handleDragEnd);
  }

  render() {
    this.$target.innerHTML = "";

    const { card, className } = this.props;

    this.$target.className = className;
    this.$target.id = card.id;
    this.$target.draggable = true;
    this.$target.textContent = card.name;
  }

  handleDragStart = (e: DragEvent) => {
    const { listId, card, onDragStart } = this.props;
    onDragStart(listId, card);
  };

  handleDragEnd = (e: DragEvent) => {
    const { onDragEnd } = this.props;
    onDragEnd(e);
  };
}

export default Card;
