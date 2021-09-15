import Layout from "../common/Layout.js";
import Component from "../core/Component.js";
import Button from "./Button.js";
import Input from "./Input.js";

interface Props {
  open: boolean;
  className: string;
  placeholder: string;
  onSubmit: (name: string) => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
}

interface State {}

class Form extends Component<Props, State> {
  $target: HTMLFormElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.$target = document.createElement("form");
    this.$parent.appendChild(this.$target);

    this.render();
    this.$target.addEventListener("submit", this.handleSubmit);
  }

  render() {
    this.$target.innerHTML = "";
    const { className, placeholder, open, onOpenForm, onCloseForm } =
      this.props;
    this.$target.className = className;

    if (open) {
      new Input(this.$target, {
        className: `${className}__input`,
        placeholder,
      });

      const ButtonContainer = new Layout(this.$target, {
        className: "button-container",
      });
      new Button(ButtonContainer.$target, {
        className: `${className}__submit`,
        textContent: "Add",
        onClick: this.handleSubmit,
      });
      new Button(ButtonContainer.$target, {
        className: `${className}__cancel`,
        textContent: "Cancel",
        onClick: onCloseForm,
      });
      this.$target.append(ButtonContainer.$target);
    } else {
      new Button(this.$target, {
        className: `${className}__open`,
        textContent: placeholder,
        onClick: onOpenForm,
      });
    }
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();

    const inputElement = this.$target.querySelector("input");
    if (inputElement && inputElement.value) {
      this.props.onSubmit(inputElement.value);
    }
  };
}

export default Form;
