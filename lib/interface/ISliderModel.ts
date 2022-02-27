import SliderViewProps from '../type/SliderViewProps';

interface ISliderModel {
  setDotsValues(dots: number[]): void;
  getMin(): number;
  getStep(): number;
  getLength(): number;
  getValues(): number[];
  getViewProps(): SliderViewProps;
  getDotsValues(): number[];
  getClosestValue(target: number): number;
  getClosestDotIndex(target: number): number;
  getDivisionsValues(): number[];
  calculateValues(): number[];
}
export default ISliderModel;
