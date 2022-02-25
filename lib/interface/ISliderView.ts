import type ISliderDotView from './ISliderDotView';
import type ISliderPresenter from './ISliderPresenter';
import type ISliderRangeView from './ISliderRangeView';

interface ISliderView {
  presenter: ISliderPresenter;
  setDotPosition(dotIndex: number, pos: number): void;
  setProgressPosition(pos: number): void;
  getContainer(): JQuery<HTMLElement>;
  getRect(): DOMRect;
  getDots(): ISliderDotView[];
  getSliderWidth(): number;
  destroy(): void;
  compileElement(): JQuery;
  render(): void;
}

export default ISliderView;
