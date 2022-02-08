interface ISliderDotView {
  element: JQuery;
  active: boolean;
  shift: number;
  setActive(state: boolean): void;
  setShift(state: number): void;
  mouseDownHandler(e: MouseEvent): void;
  mouseUpHandler(e: MouseEvent): void;
  mouseMoveHandler(e: MouseEvent): void;
  renderElement(): JQuery;
}

export default ISliderDotView;