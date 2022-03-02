import ProgressThumbData from '../type/ProgressThumbData';
import type ISliderThumbView from './ISliderThumbView';
import type ISliderPresenter from './ISliderPresenter';
import type ISliderRangeView from './ISliderRangeView';

interface ISliderView {
  presenter: ISliderPresenter;
  setThumbPosition(thumbIndex: number, pos: number): void;
  setSmoothClass(): void;
  getContainer(): JQuery<HTMLElement>;
  getRect(): DOMRect;
  getThumbs(): ISliderThumbView[];
  getSliderWidth(): number;
  updateProgressPosition(thumbData?: ProgressThumbData): void;
  updateThumb(index: number, pos: number): void;
  moveClosestThumbToPos(pos: number): void;
  compileElement(): JQuery;
  render(): void;
  destroy(): void;
}

export default ISliderView;
