import * as $ from 'jquery';

import ISliderRangeView from "../../interface/ISliderRangeView";

class SliderRangeView implements ISliderRangeView {
  element: JQuery<HTMLElement>;

  constructor() {

  }
  
  render(): JQuery<HTMLElement> {
    const rangeElement = $('<div/>', {
      class: 'slider__range',
    });

    this.element = rangeElement;
    return this.element;
  }
}

export default SliderRangeView;