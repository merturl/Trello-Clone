import Component from "../core/Component.js";

interface Props {
  className: string;
  placeholder: string;
}

interface State {}

class Input extends Component<Props, State> {
  $target: HTMLInputElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.state = {};
    this.$target = document.createElement("input");

    $parent.appendChild(this.$target);
    this.render();
  }

  render() {
    this.$target.innerHTML = "";
    const { className, placeholder } = this.props;
    this.$target.className = className;
    this.$target.placeholder = placeholder;
    this.$target.focus();
  }
}

export default Input;
