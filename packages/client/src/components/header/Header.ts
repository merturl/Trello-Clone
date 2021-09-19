import Icon from "../common/Icon.js";
import Component from "../core/Component.js";
import HeaderItem from "./NavItem.js";

interface Props {
  className: string;
}

interface State {}

class Header extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);

    this.$target = document.createElement("div");
    this.$parent.appendChild(this.$target);
    this.render();
  }
  render = () => {
    this.$target.innerHTML = "";

    const { className } = this.props;
    this.$target.className = className;

    this.$target;
    const leftItem = new HeaderItem(this.$target, {
      className: "left-header",
      textContent: "웹 프론트엔드 과제",
    });
    const rightItem = new HeaderItem(this.$target, {
      className: "right-header",
    });
    new Icon(rightItem.$target, {
      className: "fas fa-ellipsis-h icon",
      textContent: "Show Menu",
    });
  };
}

export default Header;
