import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';
import ISliderDotView from './ISliderDotView';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  getClosestDot(pos: number): number;
  getClosestPos(pos: number): number;
  convertDOMPosToSliderValue(pos: number): number;
  convertSliderValueToDOMPos(val: number): number;
  destroy(): void;
}

export default ISliderPresenter;
