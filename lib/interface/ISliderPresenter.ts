import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';
import SliderViewProps from '../type/SliderViewProps';
import MarksData from '../type/MarksData';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  getClosestValue(pos: number): number;
  getClosestThumb(pos: number): number;
  getClosestPos(pos: number): number;
  getDivisions(): MarksData[];
  getViewProps(): SliderViewProps;
  // updateModel(props: object): void;
  updateThumbValue(index: number, pos: number): number;
  convertDOMPosToSliderValue(pos: number): number;
  convertSliderValueToDOMPos(val: number): number;
  destroy(): void;
}

export default ISliderPresenter;
