import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';
import SliderViewProps from '../type/SliderViewProps';
import MarksData from '../type/MarksData';
import SliderProps from '../type/SliderProps';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  setToggableProp<K extends keyof SliderProps>(key: K, val: boolean): void;
  setMin(val: number): void;
  setMax(val: number): void;
  setStep(val: number): void;
  setThumbs(val: number[]): void;
  getClosestValue(pos: number): number;
  getClosestThumb(pos: number): number;
  getClosestPos(pos: number): number;
  getDivisions(): MarksData[];
  getViewProps(): SliderViewProps;
  updateThumbValue(index: number, pos: number): number;
  convertDOMPosToSliderValue(pos: number): number;
  convertSliderValueToDOMPos(val: number): number;
  updateView(): void;
}

export default ISliderPresenter;
