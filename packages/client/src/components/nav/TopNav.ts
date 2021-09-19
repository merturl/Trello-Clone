import Icon from "../common/Icon.js";
import Component from "../core/Component.js";
import NavItem from "./NavItem.js";

interface Props {
  className: string;
}

interface State {}

class TabNav extends Component<Props, State> {
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

    const leftNavItem = new NavItem(this.$target, { className: "left-nav" });
    new Icon(leftNavItem.$target, { className: "fas fa-arrow-left icon" });
    new Icon(leftNavItem.$target, { className: "fas fa-search icon" });

    new NavItem(this.$target, {
      className: "mid-nav",
      textContent: "Trello",
    });

    const rightNavItem = new NavItem(this.$target, { className: "right-nav" });
    new Icon(rightNavItem.$target, { className: "fas fa-plus icon" });
    new Icon(rightNavItem.$target, { className: "fas fa-bell icon" });
    new Icon(rightNavItem.$target, { className: "fas fa-user icon" });
  };
}

export default TabNav;
