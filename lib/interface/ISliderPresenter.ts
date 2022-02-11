import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';
import ISliderDotView from './ISliderDotView';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  getClosestDotIndex(pos: number): number;
  convertDOMPosToSliderValue(pos: number): number;
  destroy(): void;
}

export default ISliderPresenter;
