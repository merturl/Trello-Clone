import { ListInfo } from "../../types/global.js";
import Component from "../core/Component.js";
import Title from "./Title.js";

interface Props {
  className: string;
  list: ListInfo;
  onDragOver: (
    draggedOverCardId: string | null,
    draggedOverList: ListInfo
  ) => void;
}

interface State {}

class List extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.state = {};
    document.createDocumentFragment;
    this.$target = document.createElement("div");
    this.$parent.appendChild(this.$target);
    this.render();

    this.$target.addEventListener("dragover", this.handleDragOver);
  }

  render = () => {
    this.$target.innerHTML = "";

    const { list, className } = this.props;
    this.$target.className = className;

    new Title(this.$target, {
      id: list.id,
      className: "list__title",
      textContent: list.name,
    });
  };

  handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { list, onDragOver } = this.props;
    const cardElement = <HTMLElement>e.target;
    const listElement = <HTMLElement>e.currentTarget;

    const cardId = cardElement !== listElement ? cardElement.id : null;
    onDragOver(cardId, list);
  };
}

export default List;
