import * as $ from 'jquery';

class SliderDot {
  value;

  element;

  innerShift;

  active;

  shift;

  constructor(value) {
    this.value = value;
    this.active = false;

    this.element = $('<div/>', {
      class: 'slider__dot',
      draggable: false,
    });
    this.bindEvents();
  }

  mouseDownHandler(e) {
    this.setActive(true);
    this.setShift(e.offsetX + 8);
  }

  mouseUpHandler() {
    this.setActive(false);
    this.setShift(null);
  }

  mouseMoveHandler(e) {
    if (this.active) {
      const pos = e.clientX - this.shift;
      this.element.css({ left: `${pos}px` });
    }
  }

  bindEvents() {
    this.element.on('dragstart', () => false);

    this.element.on('mousedown', (e) => {
      this.mouseDownHandler(e);
    });

    $(document).on('mouseup', () => {
      if (this.active) {
        this.mouseUpHandler();
      }
    });

    $(document).on('mousemove', (e) => {
      if (this.active) {
        this.mouseMoveHandler(e);
      }
    });
  }

  getRect() {
    return this.element[0].getBoundingClientRect();
  }

  setActive(state) {
    this.active = state;
  }

  setShift(state) {
    this.shift = state;
  }

  getElement() {
    return this.element;
  }
}

export default SliderDot;
