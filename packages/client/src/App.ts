import Board from "./components/board/Boards.js";
import Layout from "./components/common/Layout.js";
import Component from "./components/core/Component.js";
import Header from "./components/header/Header.js";
import TabNav from "./components/nav/TopNav.js";
interface Props {}

interface State {}

class App extends Component<Props, State> {
  $target: HTMLDivElement;

  constructor($parent: HTMLElement, props: Props) {
    super($parent, props);
    this.state = {};
    this.$target = document.createElement("div");
    this.$parent.appendChild(this.$target);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = "";
    this.$target.className = "main";
    const webSocket = new WebSocket("ws://localhost:3000");
    new TabNav(this.$target, { className: "top-nav" });
    const BoardContainer = new Layout(this.$target, {
      className: "board-container",
    });
    new Header(BoardContainer.$target, { className: "header" });
    new Board(BoardContainer.$target, { webSocket });
  };
}

export default App;
