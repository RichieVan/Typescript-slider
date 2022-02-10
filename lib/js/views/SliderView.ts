import * as $ from 'jquery';

import ISliderDotView from "../../interface/ISliderDotView";
import ISliderRangeView from "../../interface/ISliderRangeView";
import ISliderView from "../../interface/ISliderView";
import SliderDotView from "./SliderDotView";
import SliderRangeView from "./SliderRangeView";

class SliderView implements ISliderView {
  element: JQuery<HTMLElement>;

  dotView: ISliderDotView;

  rangeView: ISliderRangeView;

  constructor() {
    this.dotView = new SliderDotView();
    this.rangeView = new SliderRangeView();
  }

  render(): void {
    const sliderElement = $('<div/>', {
      class: 'slider',
    });

    const sliderWrapperElement = $('<div/>', {
      class: 'slider__wrapper',
    });

    const sliderRangeElement = this.rangeView.render();
    const sliderDotElement = this.dotView.render();

    sliderElement.append(sliderWrapperElement);
    sliderWrapperElement.append([sliderRangeElement, sliderDotElement]);

    this.element = sliderElement;
    document.body.appendChild(this.element[0]);
  }

  destroy(): void {
    this.element.remove();
  }
}

export default SliderView;