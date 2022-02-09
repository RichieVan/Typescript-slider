interface ISliderDotView {
  element: JQuery;
  active: boolean;
  shift: number;
  setActive(val: boolean): void;
  setShift(val: number): void;
  getRect(): object;
  mouseDownHandler(e: JQuery.MouseDownEvent): void;
  mouseUpHandler(): void;
  mouseMoveHandler(e: JQuery.MouseMoveEvent): void;
  render(): JQuery;
}

export default ISliderDotView;