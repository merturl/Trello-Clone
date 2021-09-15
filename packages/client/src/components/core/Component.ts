abstract class Component<P = {}, S = {}> {
  state: S;
  constructor(
    protected readonly $parent: HTMLElement,
    protected readonly props: P
  ) {
    this.state = <S>{};
  }
  abstract render(): void;
  setState = (newState: S) => {
    this.state = newState;
    this.render();
  };
}

export default Component;
