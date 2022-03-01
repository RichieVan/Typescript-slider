import $ from 'jquery';

import type ISliderDotView from '../../interface/ISliderDotView';
import type ISliderView from '../../interface/ISliderView';
import DOMHelper from '../helpers/DOMHelper';

class SliderDotView implements ISliderDotView {
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
    this.element.addClass(DOMHelper.getDotActiveClass());
  }

  mouseUpHandler(e: JQuery.MouseUpEvent): void {
    if (this.active) {
      const isSmooth = this.parentView.presenter.getViewProps().smooth;
      if (isSmooth) {
        const eventClass = DOMHelper.getDotViewMouseUpEventClass();
        const sliderContainer = this.parentView.getContainer();
        sliderContainer.addClass(eventClass);

        const sliderWidth = this.parentView.getSliderWidth();
        const pos = ((e.clientX - this.shift) / sliderWidth) * 100;
        const validPos = this.parentView.presenter.getClosestPos(pos);
        this.setPosition(validPos);
        this.parentView.updateProgressPosition();
        setTimeout(() => {
          sliderContainer.removeClass(eventClass);
        }, 150);
      }
      this.setActive(false);
      this.setShift(0);
      this.element.removeClass(DOMHelper.getDotActiveClass());
    }
  }

  mouseMoveHandler(e: JQuery.MouseMoveEvent): void {
    if (this.active) {
      e.preventDefault();
      const { smooth, dots, showThumbValue } = this.parentView.presenter.getViewProps();
      const sliderWidth = this.parentView.getSliderWidth();
      let pos = ((e.clientX - this.shift) / sliderWidth) * 100;

      if (pos < 0) {
        pos = 0;
      }

      if (pos > 100) {
        pos = 100;
      }

      if (dots.length > 1) {
        let nextDotPos;
        if (this.index === 0) {
          nextDotPos = this.parentView.presenter.convertSliderValueToDOMPos(dots[1]);
        } else {
          nextDotPos = this.parentView.presenter.convertSliderValueToDOMPos(dots[0]);
        }

        if ((this.index === 0 && pos > nextDotPos) || (this.index === 1 && pos < nextDotPos)) pos = nextDotPos;
      }

      let validPos;
      if (smooth) {
        validPos = pos;
      } else {
        validPos = this.parentView.presenter.getClosestPos(pos);
      }

      // const updatedValue = this.parentView.presenter.updateDotValue(this.index, validPos);
      // if (showThumbValue) this.updateMarkValue(updatedValue);
      // this.setPosition(validPos);
      this.parentView.updateDot(this.index, validPos);
      this.parentView.updateProgressPosition({
        index: this.index,
        pos: validPos,
      });
    }
  }

  updateMarkValue(val: number): void {
    if (this.valueElement) this.valueElement.html(val.toString());
  }

  compileElement(content: JQuery): JQuery<HTMLElement> {
    const dot = DOMHelper.createDotElement();

    dot.on('dragstart', () => false);

    dot.on('mousedown', (e: JQuery.MouseDownEvent) => {
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
      const [thumbMarkElement, thumbValueElement] = DOMHelper.createDotMarkElement();
      this.markElement = thumbMarkElement;
      this.valueElement = thumbValueElement;
      const thumbValue = this.parentView.presenter.getViewProps().dots[this.index];
      this.updateMarkValue(thumbValue);
      dot.append(this.markElement);
    }
    dot.append(content);

    return dot;
  }

  render(): JQuery {
    return this.element;
  }
}

export default SliderDotView;
