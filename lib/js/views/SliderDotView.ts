import * as $ from 'jquery';
import ISliderDotView from '../../interface/ISliderDotView';

class SliderDotView implements ISliderDotView {
  element: JQuery;

  active: boolean;

  shift: number;

  constructor() {
    
  }

  setActive(state) {
    this.active = state;
  }

  setShift(state) {
    this.shift = state;
  }

  getRect() {
    return this.element[0].getBoundingClientRect();
  }

  getElement() {
    return this.element;
  }

  mouseDownHandler(e) {
    this.setActive(true);
    this.setShift(e.offsetX + 8);
  }

  mouseUpHandler() {
    if (this.active) {
      this.setActive(false);
      this.setShift(0);
    }
  }

  mouseMoveHandler(e) {
    if (this.active) {
      const pos = e.clientX - this.shift;
      this.element.css({ left: `${pos}px` });
    }
  }

  renderElement(): JQuery {
    const htmlElement = $('<div/>', {
      class: 'slider__dot',
      draggable: false,
    });

    this.element.on('dragstart', () => false);

    this.element.on('mousedown', (e) => {
      this.mouseDownHandler(e);
    });

    $(document).on('mouseup', () => {
      this.mouseUpHandler();
    });

    $(document).on('mousemove', (e) => {
      if (this.active) {
        this.mouseMoveHandler(e);
      }
    });

    this.element = htmlElement;
    return this.element;
  }
}

export default SliderDotView;
