import Component from "../core/Component.js";

interface Props {
  className: string;
  textContent: string;
  onClick: Function;
}

interface State {}

class Button extends Component<Props, State> {
  $target: HTMLButtonElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.$target = document.createElement("button");
    this.state = {};
    $parent.appendChild(this.$target);
    this.render();

    this.$target.addEventListener("click", this.handleClick);
  }

  render() {
    this.$target.innerHTML = "";
    const { className, textContent } = this.props;
    this.$target.className = className;
    this.$target.textContent = textContent;
  }

  handleClick = (e: Event) => {
    e.preventDefault();

    this.props.onClick(e);
  };
}

export default Button;
