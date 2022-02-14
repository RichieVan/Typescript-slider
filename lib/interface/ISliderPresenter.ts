import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  getClosestDot(pos: number): number;
  getClosestPos(pos: number): number;
  getDivisions(): number[];
  convertDOMPosToSliderValue(pos: number): number;
  convertSliderValueToDOMPos(val: number): number;
  destroy(): void;
}

export default ISliderPresenter;
