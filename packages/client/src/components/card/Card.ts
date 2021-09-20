import { CardInfo } from "../../types/global.js";
import Component from "../core/Component.js";

interface Props {
  className: string;
  card: CardInfo;
  listId: string;
  onDragOver: (
    dragStartCard: CardInfo,
    dropableCardId: string | null,
    dropableListId: string
  ) => void;
}

interface State {
  shiftX: number;
  shiftY: number;
  clone: HTMLElement | null;
  currentDroppable: HTMLElement | null;
}

class Card extends Component<Props, State> {
  $target: HTMLDivElement;
  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.$target = document.createElement("div");
    this.state = { shiftX: 0, shiftY: 0, clone: null, currentDroppable: null };
    this.$parent.appendChild(this.$target);
    this.render();

    this.$target.addEventListener("mousedown", this.handleMouseDown);
  }

  render() {
    this.$target.innerHTML = "";
    const { card, className } = this.props;
    this.$target.className = className;
    this.$target.id = card.id;
    this.$target.textContent = card.name;
    this.$target.classList.add("dropable");
  }

  handleMouseUp = () => {
    const { clone, currentDroppable } = this.state;
    if (clone && document.body.contains(clone)) {
      document.body.removeChild(clone);
    }

    if (currentDroppable) {
      currentDroppable.style.background = "white";
      currentDroppable.style.color = "#4d4d4d";
    }

    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  };

  moveAt = (pageX: number, pageY: number) => {
    const { clone, shiftX, shiftY } = this.state;
    if (!clone) return;
    clone.style.left = pageX - shiftX + "px";
    clone.style.top = pageY - shiftY + "px";
  };

  handleMouseMove = (e: MouseEvent) => {
    const { card, onDragOver } = this.props;
    const { clone } = this.state;
    if (!clone) return;
    this.moveAt(e.pageX, e.pageY);

    clone.hidden = true;
    let elemBelow = <HTMLElement>(
      document.elementFromPoint(e.clientX, e.clientY)
    );
    clone.hidden = false;

    if (!elemBelow) return;

    document.body.appendChild(clone);
    const currentDroppable = <HTMLElement>elemBelow.closest(".dropable");
    if (currentDroppable) {
      this.setState({ ...this.state, currentDroppable });
      const listElement = <HTMLElement>currentDroppable.closest(".list");
      currentDroppable.style.background = "#afb8c1";
      currentDroppable.style.color = "#afb8c1";
      onDragOver(card, currentDroppable.id, listElement.id);
    } else {
      const listElement = <HTMLElement>elemBelow.closest(".list");
      if (listElement) {
        onDragOver(card, card.id, listElement.id);
      }
    }
  };

  handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    const draggingTarget = <HTMLElement>e.target;
    const clone = <HTMLElement>draggingTarget.cloneNode(true);
    let shiftX = e.clientX - draggingTarget.getBoundingClientRect().left;
    let shiftY = e.clientY - draggingTarget.getBoundingClientRect().top;

    clone.style.position = "absolute";
    clone.style.width = `246px`;
    clone.style.transform = `rotate(3deg)`;
    this.setState({ ...this.state, clone, shiftX, shiftY });

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };
}

export default Card;
