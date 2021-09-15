import { CardInfo } from "../../types/global.js";
import Component from "../core/Component.js";

interface Props {
  className: string;
  card: CardInfo;
  listId: string;
}

interface State {}

class Card extends Component<Props, State> {
  $target: HTMLDivElement;
  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.$target = document.createElement("div");

    this.$parent.appendChild(this.$target);
    this.render();
  }

  render() {
    this.$target.innerHTML = "";

    const { card, className } = this.props;

    this.$target.className = className;
    this.$target.id = card.id;
    this.$target.draggable = true;
    this.$target.textContent = card.name;
  }
}

export default Card;
