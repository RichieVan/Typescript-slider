import $ from 'jquery';

import type ISliderThumbView from '../../interface/ISliderThumbView';
import type ISliderView from '../../interface/ISliderView';
import DOMHelper from '../helpers/DOMHelper';

class SliderThumbView implements ISliderThumbView {
  private element: JQuery<HTMLElement>;

  private content: JQuery<HTMLElement>;

  private markElement: JQuery<HTMLElement> | null = null;

  private valueElement: JQuery<HTMLElement> | null = null;

  private active = false;

  private shift = 0;

  constructor(
    public parentView: ISliderView,
    private index: number,
  ) {
    this.content = DOMHelper.createThumbContentElement();
    this.element = this.compileElement(this.content);
  }

  setActive(val: boolean): void {
    this.active = val;
  }

  setShift(val: number): void {
    this.shift = val;
  }

  setPosition(pos: number): void {
    const { vertical } = this.parentView.presenter.getViewProps();
    if (vertical) this.element.css({ top: `${pos}%` });
    else this.element.css({ left: `${pos}%` });
  }

  getRect(): DOMRect {
    return this.element[0].getBoundingClientRect();
  }

  getElement(): JQuery<HTMLElement> {
    return this.element;
  }

  getContentShift(): number {
    let contentShift: number;
    const { vertical } = this.parentView.presenter.getViewProps();
    if (vertical) contentShift = this.content[0].getBoundingClientRect().height / 2;
    else contentShift = this.content[0].getBoundingClientRect().width / 2;
    return contentShift;
  }

  mouseDownHandler(e: JQuery.MouseDownEvent | JQuery.TouchStartEvent): void {
    if (!e.touches) e.preventDefault();
    this.setActive(true);
    const { vertical } = this.parentView.presenter.getViewProps();
    let shift: number;
    if (e.touches && vertical) {
      const offset = e.touches[0].clientY - e.target.getBoundingClientRect().top;
      shift = offset + this.parentView.getRect().top - this.getContentShift();
    } else if (e.touches) {
      const offset = e.touches[0].clientX - e.target.getBoundingClientRect().left;
      shift = offset + this.parentView.getRect().left - this.getContentShift();
    } else if (vertical) {
      shift = e.offsetY + this.parentView.getRect().top - this.getContentShift();
    } else {
      shift = e.offsetX + this.parentView.getRect().left - this.getContentShift();
    }

    this.setShift(shift);
    this.element.addClass(DOMHelper.getThumbActiveClass());
  }

  mouseUpHandler(e: JQuery.MouseUpEvent | JQuery.TouchCancelEvent | JQuery.TouchEndEvent): void {
    if (this.active) {
      const { smooth, vertical } = this.parentView.presenter.getViewProps();
      if (smooth) {
        this.parentView.setSmoothClass();

        let clientPos;
        if (e.touches) [clientPos] = e.changedTouches;
        else clientPos = e;

        const validPos = this.getValidatedPos(vertical ? clientPos.clientY : clientPos.clientX);
        const resultPos = this.parentView.presenter.getClosestPos(validPos);
        this.setPosition(resultPos);
        this.parentView.updateProgressPosition();
      }
      this.setActive(false);
      this.setShift(0);
      this.element.removeClass(DOMHelper.getThumbActiveClass());
    }
  }

  mouseMoveHandler(e: JQuery.MouseMoveEvent | JQuery.TouchMoveEvent): void {
    if (this.active) {
      if (!e.touches) e.preventDefault();
      const { smooth, vertical } = this.parentView.presenter.getViewProps();
      let clientPos;
      if (e.touches) [clientPos] = e.touches;
      else clientPos = e;

      const validPos = this.getValidatedPos(vertical ? clientPos.clientY : clientPos.clientX);
      let resultPos;
      if (smooth) resultPos = validPos;
      else resultPos = this.parentView.presenter.getClosestPos(validPos);

      this.parentView.updateThumb(this.index, resultPos);
      this.parentView.updateProgressPosition({
        index: this.index,
        pos: resultPos,
      });
    }
  }

  updateMarkValue(val: number): void {
    if (this.valueElement) this.valueElement.html(val.toString());
  }

  private getValidatedPos(clientPos: number): number {
    const { thumbs } = this.parentView.presenter.getViewProps();
    const sliderSize = this.parentView.getSliderSize();
    let pos = ((clientPos - this.shift) / sliderSize) * 100;

    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;

    if (thumbs.length > 1) {
      let nextThumbPos;
      if (this.index === 0) {
        nextThumbPos = this.parentView.presenter.convertSliderValueToDOMPos(thumbs[1]);
      } else {
        nextThumbPos = this.parentView.presenter.convertSliderValueToDOMPos(thumbs[0]);
      }

      if (
        (this.index === 0 && pos > nextThumbPos)
        || (this.index === 1 && pos < nextThumbPos)
      ) {
        pos = nextThumbPos;
      }
    }

    return pos;
  }

  compileElement(content: JQuery): JQuery<HTMLElement> {
    const [element, wrapper] = DOMHelper.createThumbElement();

    element.on('dragstart', () => false);

    element
      .on('mousedown', (e: JQuery.MouseDownEvent) => this.mouseDownHandler(e))
      .on('touchstart', (e: JQuery.TouchStartEvent) => this.mouseDownHandler(e));

    $(document)
      .on('mouseup', (e: JQuery.MouseUpEvent) => this.mouseUpHandler(e))
      .on('touchend', (e: JQuery.TouchEndEvent) => this.mouseUpHandler(e))
      .on('touchcancel', (e: JQuery.TouchCancelEvent) => this.mouseUpHandler(e));

    $(document)
      .on('mousemove', (e: JQuery.MouseMoveEvent) => this.mouseMoveHandler(e))
      .on('touchmove', (e: JQuery.TouchMoveEvent) => this.mouseMoveHandler(e));

    const { showThumbValue } = this.parentView.presenter.getViewProps();
    if (showThumbValue) {
      const [thumbMarkElement, thumbValueElement] = DOMHelper.createThumbMarkElement();
      this.markElement = thumbMarkElement;
      this.valueElement = thumbValueElement;
      const thumbValue = this.parentView.presenter.getViewProps().thumbs[this.index];
      this.updateMarkValue(thumbValue);
      wrapper.append(this.markElement);
    }
    wrapper.append(content);

    return element;
  }

  render(): JQuery {
    return this.element;
  }
}

export default SliderThumbView;
