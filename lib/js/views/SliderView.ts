import $ from 'jquery';

import type ISliderDotView from '../../interface/ISliderDotView';
import type ISliderPresenter from '../../interface/ISliderPresenter';
import type ISliderRangeView from '../../interface/ISliderRangeView';
import type ISliderView from '../../interface/ISliderView';
import ProgressDotData from '../../type/ProgressDotData';
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
    this.presenter = presenter;

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

    this.container = DOMHelper.createSliderElement();
    this.element = this.compileElement();
  }

  setDotPosition(dotIndex: number, pos: number): void {
    this.dots[dotIndex].setPosition(pos);
  }

  updateProgressPosition(dotData?: ProgressDotData): void {
    if (dotData) this.rangeView.updateProgress(dotData);
    else this.rangeView.updateProgress();
  }

  updateDot(index: number, pos: number): void {
    const dot = this.dots[index];
    dot.setPosition(pos);
    const { showThumbValue } = this.presenter.getViewProps();
    const updatedValue = this.presenter.updateDotValue(index, pos);
    if (showThumbValue) dot.updateMarkValue(updatedValue);
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

    const { showMarks, showThumbValue, showMinAndMax } = this.presenter.getViewProps();

    const sliderControls = DOMHelper.createControlsElement();
    const sliderRange = this.rangeView.render();
    const sliderDots = this.dots.map((dot: ISliderDotView) => dot.getElement());

    this.container.append(sliderWrapper);
    if (showMarks) {
      const sliderDivisions = DOMHelper.createDivisionsContainerElement();
      this.presenter.getDivisions().forEach((val) => {
        const division = DOMHelper.createDivisionElement(val);
        sliderDivisions.append(division);
      });
      sliderWrapper.append(sliderDivisions);
    }
    if (showMinAndMax) {
      const sliderDivisions = DOMHelper.createDivisionsContainerElement();
      const marks = this.presenter.getDivisions();
      const validMarks = [marks[0], marks[marks.length - 1]];
      validMarks.forEach((val) => {
        const division = DOMHelper.createDivisionElement(val);
        sliderDivisions.append(division);
      });
      sliderWrapper.append(sliderDivisions);
    }
    sliderWrapper.append(sliderControls);
    sliderControls.append([sliderRange, ...sliderDots]);

    if (showThumbValue && !showMarks && !showMinAndMax) this.container.addClass(DOMHelper.getEnabledDotMarksModifierClass());

    return sliderWrapper;
  }

  render(): void {
    document.body.appendChild(this.container[0]);

    const { dots } = this.presenter.getViewProps();
    this.dots.forEach((dot, index) => {
      const convertedPos = this.presenter.convertSliderValueToDOMPos(dots[index]);
      dot.setPosition(convertedPos);
    });
    this.updateProgressPosition();
  }

  destroy(): void {
    this.element.remove();
  }
}

export default SliderView;
