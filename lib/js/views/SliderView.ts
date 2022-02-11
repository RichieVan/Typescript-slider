import $ from 'jquery';

import type ISliderDotView from '../../interface/ISliderDotView';
import type ISliderPresenter from '../../interface/ISliderPresenter';
import type ISliderRangeView from '../../interface/ISliderRangeView';
import type ISliderView from '../../interface/ISliderView';
import SliderDotView from './SliderDotView';
import SliderRangeView from './SliderRangeView';

class SliderView implements ISliderView {
  public container: JQuery<HTMLElement>;

  public element: JQuery<HTMLElement>;

  public presenter: ISliderPresenter;

  public dots: ISliderDotView[];

  public rangeView: ISliderRangeView;

  constructor(
    presenter: ISliderPresenter,
  ) {
    this.dots = [new SliderDotView(this)];
    this.rangeView = new SliderRangeView(this);
    this.presenter = presenter;

    this.container = $('<div/>', {
      class: 'slider',
    });
    this.element = this.compileElement();
  }

  setDotPosition(dotIndex: number, pos: number): void {
    this.dots[dotIndex].setPosition(pos);
  }

  getRect(): DOMRect {
    return this.element[0].getBoundingClientRect();
  }

  getDots(): ISliderDotView[] {
    return this.dots;
  }

  getSliderWidth(): number {
    return this.getRect().width;
  }

  compileElement(): JQuery<HTMLElement> {
    const sliderWrapper = $('<div/>', {
      class: 'slider__wrapper',
    });

    const sliderRange = this.rangeView.render();
    const sliderDots = this.dots.map((dot: ISliderDotView) => dot.getElement());

    this.container.append(sliderWrapper);
    sliderWrapper.append([sliderRange, ...sliderDots]);

    return sliderWrapper;
  }

  render(): void {
    document.body.appendChild(this.container[0]);
  }

  destroy(): void {
    this.element.remove();
  }
}

export default SliderView;
