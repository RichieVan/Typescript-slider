import ISliderDotView from "./ISliderDotView";
import ISliderRangeView from "./ISliderRangeView";

interface ISliderView {
  element: JQuery;
  dotView: ISliderDotView;
  rangeView: ISliderRangeView;
  destroy(): void;
  render(): void;
}

export default ISliderView;