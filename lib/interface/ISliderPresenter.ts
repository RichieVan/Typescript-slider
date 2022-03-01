import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';
import SliderViewProps from '../type/SliderViewProps';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  getClosestValue(pos: number): number;
  getClosestDot(pos: number): number;
  getClosestPos(pos: number): number;
  getDivisions(): number[];
  getViewProps(): SliderViewProps;
  // updateModel(props: object): void;
  updateDotValue(index: number, pos: number): number;
  convertDOMPosToSliderValue(pos: number): number;
  convertSliderValueToDOMPos(val: number): number;
  destroy(): void;
}

export default ISliderPresenter;
