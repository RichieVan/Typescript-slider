import SliderViewProps from '../type/SliderViewProps';

interface ISliderModel {
  getMin(): number;
  getStep(): number;
  getLength(): number;
  getValues(): number[];
  getViewProps(): SliderViewProps;
  getClosestValue(target: number): number;
  getClosestDotIndex(target: number): number;
  getDivisionsValues(): number[];
  calculateValues(): number[];
}
export default ISliderModel;
