import SliderViewProps from '../type/SliderViewProps';

interface ISliderModel {
  setThumbsValues(thumbs: number[]): void;
  getMin(): number;
  getStep(): number;
  getLength(): number;
  getValues(): number[];
  getViewProps(): SliderViewProps;
  getThumbsValues(): number[];
  getClosestValue(target: number): number;
  getClosestThumbIndex(target: number): number;
  getDivisionsValues(): number[];
  calculateValues(): number[];
}
export default ISliderModel;
