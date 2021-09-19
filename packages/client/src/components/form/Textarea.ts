import Component from "../core/Component.js";

interface Props {
  className: string;
  placeholder: string;
  onKeyPress: (name: string) => void;
}

interface State {}

class Textarea extends Component<Props, State> {
  $target: HTMLTextAreaElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.state = {};
    this.$target = document.createElement("textarea");

    $parent.appendChild(this.$target);
    this.render();
    this.$target.addEventListener("keyup", this.handleKeyUp);
  }

  render() {
    this.$target.innerHTML = "";
    const { className, placeholder } = this.props;
    this.$target.className = className;
    this.$target.placeholder = placeholder;
    this.$target.focus();
  }

  handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        if (this.$target.value.trim().length === 0) {
          this.$target.value = "";
        } else {
          this.props.onKeyPress(this.$target.value);
        }
      }
    }
  };
}

export default Textarea;
