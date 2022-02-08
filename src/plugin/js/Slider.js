import * as $ from 'jquery';
import SliderDot from './SliderDot';

class Slider {
  min = 0;

  max = 10;

  // current;

  step = 1;

  firstDot;

  constructor(options) {
    this.firstDot = new SliderDot(1);
  }

  render() {
    const slider = $('<div/>', {
      class: 'slider',
    });

    const sliderWrapper = $('<div/>', {
      class: 'slider__wrapper',
    });

    const sliderRange = $('<div/>', {
      class: 'slider__range',
    });

    sliderRange.on('mousedown', function () {
      console.log(this.getBoundingClientRect());
    });

    slider.append(sliderWrapper);
    sliderWrapper.append([sliderRange, this.firstDot.getElement()]);
    console.log(slider);

    document.body.appendChild(slider[0]);
  }
}

export default Slider;
