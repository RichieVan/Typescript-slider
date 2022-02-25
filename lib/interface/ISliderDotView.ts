import type ISliderView from './ISliderView';

interface ISliderDotView {
  element: JQuery;
  content: JQuery;
  active: boolean;
  shift: number;
  parentView: ISliderView;
  setActive(val: boolean): void;
  setShift(val: number): void;
  setPosition(pos: number): void;
  getRect(): DOMRect;
  getElement(): JQuery;
  getContentShift(): number;
  mouseDownHandler(e: JQuery.MouseDownEvent): void;
  mouseUpHandler(e: JQuery.MouseUpEvent): void;
  mouseMoveHandler(e: JQuery.MouseMoveEvent): void;
  compileElement(content: JQuery): JQuery;
  render(): JQuery;
}

export default ISliderDotView;
