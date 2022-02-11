import type ISliderView from './ISliderView';

interface ISliderRangeView {
  element: JQuery;
  parentView: ISliderView;
  getRect(): DOMRect;
  mouseClickHandler(e: JQuery.ClickEvent): void;
  compileElement(): JQuery;
  render(): JQuery;
}

export default ISliderRangeView;
