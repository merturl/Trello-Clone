import Component from "../core/Component.js";

interface Props {
  className: string;
}

interface State {}

class Layout extends Component<Props, State> {
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
  };
}

export default Layout;
