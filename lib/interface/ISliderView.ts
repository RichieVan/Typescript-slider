import ProgressDotData from '../type/ProgressDotData';
import type ISliderDotView from './ISliderDotView';
import type ISliderPresenter from './ISliderPresenter';
import type ISliderRangeView from './ISliderRangeView';

interface ISliderView {
  presenter: ISliderPresenter;
  setDotPosition(dotIndex: number, pos: number): void;
  updateProgressPosition(dotData?: ProgressDotData): void;
  updateDot(index: number, pos: number): void;
  getContainer(): JQuery<HTMLElement>;
  getRect(): DOMRect;
  getDots(): ISliderDotView[];
  getSliderWidth(): number;
  destroy(): void;
  compileElement(): JQuery;
  render(): void;
}

export default ISliderView;
