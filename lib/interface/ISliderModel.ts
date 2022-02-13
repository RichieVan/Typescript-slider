interface ISliderModel {
  min: number;
  max: number;
  step: number;
  values: number[];
  dotsValues: number[];
  getStep(): number;
  getLength(): number;
  getValues(): number[];
  getClosestValue(target: number): number;
  getClosestDotIndex(target: number): number;
  calculateValues(): number[];
}
export default ISliderModel;
