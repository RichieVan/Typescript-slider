import ISliderDotView from "./ISliderDotView";
import ISliderRangeView from "./ISliderRangeView";

interface ISliderView {
  element: JQuery;
  dotView: ISliderDotView;
  rangeView: ISliderRangeView;
  render(): void;
}

export default ISliderView;