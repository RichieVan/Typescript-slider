import type ISliderDotView from './ISliderDotView';
import type ISliderPresenter from './ISliderPresenter';
import type ISliderRangeView from './ISliderRangeView';

interface ISliderView {
  container: JQuery;
  element: JQuery;
  presenter: ISliderPresenter;
  dots: ISliderDotView[];
  rangeView: ISliderRangeView;
  setDotPosition(dotIndex: number, pos: number): void;
  getRect(): DOMRect;
  getDots(): ISliderDotView[];
  getSliderWidth(): number;
  destroy(): void;
  compileElement(): JQuery;
  render(): void;
}

export default ISliderView;
