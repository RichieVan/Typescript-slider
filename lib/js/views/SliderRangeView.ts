import $ from 'jquery';

import ISliderRangeView from '../../interface/ISliderRangeView';
import ISliderView from '../../interface/ISliderView';

class SliderRangeView implements ISliderRangeView {
  element: JQuery<HTMLElement>;

  constructor(public parentView: ISliderView) {
    this.element = this.compileElement();
  }

  getRect(): DOMRect {
    return this.element[0].getBoundingClientRect();
  }

  mouseClickHandler(e: JQuery.ClickEvent): void {
    const pos = e.clientX - this.getRect().left;
    const dotIndex = this.parentView.presenter.getClosestDotIndex(pos);
    this.parentView.setDotPosition(dotIndex, pos);
  }

  compileElement(): JQuery<HTMLElement> {
    const range = $('<div/>', {
      class: 'slider__range',
    });

    range.on('dragstart', () => false);

    range.on('click', (e: JQuery.ClickEvent) => {
      this.mouseClickHandler(e);
    });

    return range;
  }

  render(): JQuery<HTMLElement> {
    return this.element;
  }
}

export default SliderRangeView;
