import Component from "../core/Component.js";

interface Props {
  className: string;
  textContent?: string;
}

interface State {}

class Icon extends Component<Props, State> {
  $target: HTMLElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);

    this.$target = document.createElement("i");
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

export default Icon;
