import Component from "../core/Component.js";

interface Props {
  id: string;
  className: string;
  textContent: string;
}

interface State {}

class Title extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.$target = document.createElement("div");

    this.$parent.appendChild(this.$target);
    this.render();
  }
  render = () => {
    this.$target.innerHTML = "";
    const { id, className, textContent } = this.props;
    this.$target.className = className;
    this.$target.id = id;
    this.$target.textContent = textContent;
  };
}

export default Title;
