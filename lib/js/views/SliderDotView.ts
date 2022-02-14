import $ from 'jquery';

import type ISliderDotView from '../../interface/ISliderDotView';
import type ISliderView from '../../interface/ISliderView';
import DOMHelper from '../helpers/DOMHelper';

class SliderDotView implements ISliderDotView {
  public element: JQuery<HTMLElement>;

  content: JQuery<HTMLElement>;

  public active = false;

  public shift = 0;

  constructor(public parentView: ISliderView) {
    this.content = DOMHelper.createDotContentElement();
    this.element = this.compileElement(this.content);
  }

  setActive(val: boolean): void {
    this.active = val;
  }

  setShift(val: number): void {
    this.shift = val;
  }

  setPosition(pos: number): void {
    this.element.css({ left: `${pos}px` });
  }

  getRect(): DOMRect {
    return this.element[0].getBoundingClientRect();
  }

  getElement(): JQuery<HTMLElement> {
    return this.element;
  }

  getContentShift(): number {
    return this.content[0].getBoundingClientRect().width / 2;
  }

  mouseDownHandler(e: JQuery.MouseDownEvent): void {
    this.setActive(true);
    this.setShift(e.offsetX + this.parentView.getRect().left - this.getContentShift());
  }

  mouseUpHandler(): void {
    if (this.active) {
      this.setActive(false);
      this.setShift(0);
    }
  }

  mouseMoveHandler(e: JQuery.MouseMoveEvent): void {
    if (this.active) {
      let pos = e.clientX - this.shift;
      if (pos < 0) {
        pos = 0;
      }

      const sliderWidth = this.parentView.getSliderWidth();
      if (pos > sliderWidth) {
        pos = sliderWidth;
      }

      const validPos = this.parentView.presenter.getClosestPos(pos);
      this.setPosition(validPos);
    }
  }

  compileElement(content: JQuery): JQuery<HTMLElement> {
    const dot = DOMHelper.createDotElement();

    dot.on('dragstart', () => false);

    dot.on('mousedown', (e: JQuery.MouseDownEvent) => {
      this.mouseDownHandler(e);
    });

    $(document).on('mouseup', () => {
      this.mouseUpHandler();
    });

    $(document).on('mousemove', (e: JQuery.MouseMoveEvent) => {
      this.mouseMoveHandler(e);
    });

    dot.append(content);

    return dot;
  }

  render(): JQuery {
    return this.element;
  }
}

export default SliderDotView;
