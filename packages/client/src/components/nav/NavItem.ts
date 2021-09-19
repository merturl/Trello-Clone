import Component from "../core/Component.js";

interface Props {
  className: string;
  textContent?: string;
}

interface State {}

class NavItem extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);

    this.$target = document.createElement("div");
    this.$parent.appendChild(this.$target);
    this.render();
  }
  render = () => {
    this.$target.innerHTML = "";

    const { className, textContent } = this.props;
    this.$target.className = className;
    this.$target.textContent = textContent ?? "";
  };
}

export default NavItem;
