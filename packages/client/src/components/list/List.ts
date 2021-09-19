import { ListInfo } from "../../types/global.js";
import Component from "../core/Component.js";
import Title from "./Title.js";

interface Props {
  className: string;
  list: ListInfo;
}

interface State {}

class List extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.state = {};
    this.$target = document.createElement("div");
    this.$parent.appendChild(this.$target);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = "";

    const { list, className } = this.props;
    this.$target.className = className;
    this.$target.id = list.id;

    new Title(this.$target, {
      id: list.id,
      className: "list__title",
      textContent: list.name,
    });
  };
}

export default List;
