import Layout from "../common/Layout.js";
import Component from "../core/Component.js";
import Button from "./Button.js";
import Input from "./Input.js";
import Textarea from "./Textarea.js";

interface Props {
  open: boolean;
  type: string;
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
    const {
      className,
      type,
      placeholder,
      open,
      onOpenForm,
      onCloseForm,
      onSubmit,
    } = this.props;
    this.$target.className = className;

    if (open) {
      if (type === "list") {
        new Input(this.$target, {
          className: `${className}__input`,
          placeholder,
        });
      } else {
        new Textarea(this.$target, {
          className: `${className}__textarea`,
          placeholder,
          onKeyPress: onSubmit,
        });
      }

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
    const { type } = this.props;

    if (type === "list") {
      const inputElement = this.$target.querySelector("input");
      if (inputElement && inputElement.value.length > 0) {
        this.props.onSubmit(inputElement.value);
      }
    } else {
      const textareaElement = this.$target.querySelector("textarea");
      if (textareaElement) {
        this.props.onSubmit(textareaElement.value);
      }
    }
  };
}

export default Form;
