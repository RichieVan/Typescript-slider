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
  getSliderSize(): number;
  updateProgressPosition(thumbData?: ProgressThumbData): void;
  updateThumb(index: number, pos: number): void;
  moveClosestThumbToPos(pos: number): void;
  compile(): JQuery<HTMLElement>;
  render(target: JQuery<HTMLElement> | HTMLElement): void;
  destroy(): void;
}

export default ISliderView;
