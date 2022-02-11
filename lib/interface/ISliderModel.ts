interface ISliderModel {
  min: number;
  max: number;
  step: number;
  values: number[];
  getStep(): number;
  getLenght(): number;
  getIndexOfClosestValue(target: number): number;
}
export default ISliderModel;
