import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';
import SliderViewProps from '../type/SliderViewProps';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  getClosestDot(pos: number): number;
  getClosestPos(pos: number): number;
  getDivisions(): number[];
  getViewProps(): SliderViewProps;
  convertDOMPosToSliderValue(pos: number): number;
  convertSliderValueToDOMPos(val: number): number;
  destroy(): void;
}

export default ISliderPresenter;
