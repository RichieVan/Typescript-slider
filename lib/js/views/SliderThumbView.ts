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
    this.element.css({ left: `${pos}%` });
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
    e.preventDefault();
    this.setActive(true);
    this.setShift(e.offsetX + this.parentView.getRect().left - this.getContentShift());
    this.element.addClass(DOMHelper.getThumbActiveClass());
  }

  mouseUpHandler(e: JQuery.MouseUpEvent): void {
    if (this.active) {
      const { smooth } = this.parentView.presenter.getViewProps();
      if (smooth) {
        this.parentView.setSmoothClass();

        const validPos = this.getValidatedPos(e.clientX);
        const resultPos = this.parentView.presenter.getClosestPos(validPos);
        this.setPosition(resultPos);
        this.parentView.updateProgressPosition();
      }
      this.setActive(false);
      this.setShift(0);
      this.element.removeClass(DOMHelper.getThumbActiveClass());
    }
  }

  mouseMoveHandler(e: JQuery.MouseMoveEvent): void {
    if (this.active) {
      e.preventDefault();
      const { smooth } = this.parentView.presenter.getViewProps();

      const validPos = this.getValidatedPos(e.clientX);
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
    const sliderWidth = this.parentView.getSliderWidth();
    let pos = ((clientPos - this.shift) / sliderWidth) * 100;

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

    element.on('mousedown', (e: JQuery.MouseDownEvent) => {
      this.mouseDownHandler(e);
    });

    $(document).on('mouseup', (e: JQuery.MouseUpEvent) => {
      this.mouseUpHandler(e);
    });

    $(document).on('mousemove', (e: JQuery.MouseMoveEvent) => {
      this.mouseMoveHandler(e);
    });

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
