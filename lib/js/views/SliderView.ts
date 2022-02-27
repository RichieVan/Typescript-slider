import $ from 'jquery';

import type ISliderDotView from '../../interface/ISliderDotView';
import type ISliderPresenter from '../../interface/ISliderPresenter';
import type ISliderRangeView from '../../interface/ISliderRangeView';
import type ISliderView from '../../interface/ISliderView';
import DOMHelper from '../helpers/DOMHelper';
import SliderDotView from './SliderDotView';
import SliderRangeView from './SliderRangeView';

class SliderView implements ISliderView {
  private container: JQuery<HTMLElement>;

  private element: JQuery<HTMLElement>;

  public presenter: ISliderPresenter;

  private dots: ISliderDotView[];

  private rangeView: ISliderRangeView;

  constructor(
    presenter: ISliderPresenter,
  ) {
    const { range, dots } = presenter.getViewProps();
    if (range) {
      const dotsList: SliderDotView[] = [];
      dots.forEach((val, index) => {
        dotsList.push(new SliderDotView(this, index));
      });
      this.dots = dotsList;
    } else {
      this.dots = [new SliderDotView(this, 0)];
    }
    this.rangeView = new SliderRangeView(this);
    this.presenter = presenter;

    this.container = DOMHelper.createSliderElement();
    this.element = this.compileElement();
  }

  setDotPosition(dotIndex: number, pos: number): void {
    this.dots[dotIndex].setPosition(pos);
  }

  setProgressPosition(to: number): void;
  setProgressPosition(to: number, from: number): void;
  setProgressPosition(to: number, from?: number): void {
    if (from) this.rangeView.setProgress(to, from);
    else this.rangeView.setProgress(to);
  }

  getContainer(): JQuery<HTMLElement> {
    return this.container;
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
    const sliderWrapper = DOMHelper.createWrapperElement();

    const sliderDivisions = DOMHelper.createDivisionsContainerElement();
    this.presenter.getDivisions().forEach((val) => {
      const division = DOMHelper.createDivisionElement(val);
      sliderDivisions.append(division);
    });

    const sliderControls = DOMHelper.createControlsElement();
    const sliderRange = this.rangeView.render();
    const sliderDots = this.dots.map((dot: ISliderDotView) => dot.getElement());

    this.container.append(sliderWrapper);
    sliderWrapper.append([sliderDivisions, sliderControls]);
    sliderControls.append([sliderRange, ...sliderDots]);

    return sliderWrapper;
  }

  render(): void {
    document.body.appendChild(this.container[0]);

    const { dots } = this.presenter.getViewProps();
    this.dots.forEach((dot, index) => {
      const convertedPos = this.presenter.convertSliderValueToDOMPos(dots[index]);
      dot.setPosition(convertedPos);
    });
  }

  destroy(): void {
    this.element.remove();
  }
}

export default SliderView;
