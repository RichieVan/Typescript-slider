import type ISliderView from './ISliderView';

interface ISliderThumbView {
  parentView: ISliderView;
  setActive(val: boolean): void;
  setShift(val: number): void;
  setPosition(pos: number): void;
  getRect(): DOMRect;
  getElement(): JQuery<HTMLElement>;
  getContentShift(): number;
  mouseDownHandler(e: JQuery.MouseDownEvent | JQuery.TouchStartEvent): void;
  mouseUpHandler(e: JQuery.MouseUpEvent | JQuery.TouchEndEvent | JQuery.TouchCancelEvent): void;
  mouseMoveHandler(e: JQuery.MouseMoveEvent | JQuery.TouchMoveEvent): void;
  updateMarkValue(val: number): void;
  compile(content: JQuery<HTMLElement>): JQuery<HTMLElement>;
  render(): JQuery<HTMLElement>;
}

export default ISliderThumbView;
