import ProgressDotData from '../type/ProgressDotData';
import type ISliderDotView from './ISliderDotView';
import type ISliderPresenter from './ISliderPresenter';
import type ISliderRangeView from './ISliderRangeView';

interface ISliderView {
  presenter: ISliderPresenter;
  setDotPosition(dotIndex: number, pos: number): void;
  setSmoothClass(): void;
  getContainer(): JQuery<HTMLElement>;
  getRect(): DOMRect;
  getDots(): ISliderDotView[];
  getSliderWidth(): number;
  updateProgressPosition(dotData?: ProgressDotData): void;
  updateDot(index: number, pos: number): void;
  moveClosestDotToPos(pos: number): void;
  compileElement(): JQuery;
  render(): void;
  destroy(): void;
}

export default ISliderView;
