import type ISliderView from './ISliderView';

interface ISliderRangeView {
  setProgress(pos: number): void;
  getRangeRect(): DOMRect;
  mouseClickHandler(e: JQuery.ClickEvent): void;
  compileElement(): JQuery<HTMLElement>[];
  render(): JQuery<HTMLElement>;
}

export default ISliderRangeView;
