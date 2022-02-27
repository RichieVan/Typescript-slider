import type ISliderView from './ISliderView';

interface ISliderRangeView {
  setProgress(to: number): void;
  setProgress(to: number, from: number): void;
  getRangeRect(): DOMRect;
  mouseClickHandler(e: JQuery.ClickEvent): void;
  compileElement(): JQuery<HTMLElement>[];
  render(): JQuery<HTMLElement>;
}

export default ISliderRangeView;
