import * as $ from 'jquery';

import ISliderDotView from '../../interface/ISliderDotView';

class SliderDotView implements ISliderDotView {
  element: JQuery;

  active: boolean;

  shift: number;

  // constructor() {
  // }

  setActive(val: boolean) {
    this.active = val;
  }

  setShift(val: number) {
    this.shift = val;
  }

  getRect() {
    return this.element[0].getBoundingClientRect();
  }

  // getElement() {
  //   return this.element;
  // }

  mouseDownHandler(e: JQuery.MouseDownEvent) {
    this.setActive(true);
    this.setShift(e.offsetX + 8);
  }

  mouseUpHandler() {
    if (this.active) {
      this.setActive(false);
      this.setShift(0);
    }
  }

  mouseMoveHandler(e: JQuery.MouseMoveEvent) {
    if (this.active) {
      const pos = e.clientX - this.shift;
      this.element.css({ left: `${pos}px` });
    }
  }

  render(): JQuery {
    const htmlElement = $('<div/>', {
      class: 'slider__dot',
      draggable: false,
    });

    htmlElement.on('dragstart', () => false);

    htmlElement.on('mousedown', (e: JQuery.MouseDownEvent) => {
      this.mouseDownHandler(e);
    });

    $(document).on('mouseup', () => {
      this.mouseUpHandler();
    });

    $(document).on('mousemove', (e: JQuery.MouseMoveEvent) => {
      if (this.active) {
        this.mouseMoveHandler(e);
      }
    });

    this.element = htmlElement;
    return this.element;
  }
}

export default SliderDotView;
