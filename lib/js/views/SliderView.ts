import $ from 'jquery';

import type ISliderThumbView from '../../interface/ISliderThumbView';
import ISliderMarksView from '../../interface/ISliderMarksView';
import type ISliderPresenter from '../../interface/ISliderPresenter';
import type ISliderRangeView from '../../interface/ISliderRangeView';
import type ISliderView from '../../interface/ISliderView';
import ProgressThumbData from '../../type/ProgressThumbData';
import DOMHelper from '../helpers/DOMHelper';
import SliderThumbView from './SliderThumbView';
import SliderMarksView from './SliderMarksView';
import SliderRangeView from './SliderRangeView';

class SliderView implements ISliderView {
  private container: JQuery<HTMLElement>;

  private element: JQuery<HTMLElement>;

  public presenter: ISliderPresenter;

  private thumbs: ISliderThumbView[];

  private rangeView: ISliderRangeView;

  private marksView: ISliderMarksView | null = null;

  constructor(
    presenter: ISliderPresenter,
  ) {
    this.presenter = presenter;

    this.container = DOMHelper.createSliderElement();
    const sliderWrapper = DOMHelper.createWrapperElement();

    const {
      range,
      thumbs,
      showMarks,
      showThumbValue,
      showMinAndMax,
      vertical,
    } = this.presenter.getViewProps();

    if (range) {
      const thumbsList: SliderThumbView[] = [];
      thumbs.forEach((val, index) => {
        thumbsList.push(new SliderThumbView(this, index));
      });
      this.thumbs = thumbsList;
    } else {
      this.thumbs = [new SliderThumbView(this, 0)];
    }
    this.rangeView = new SliderRangeView(this);

    const sliderControls = DOMHelper.createControlsElement();
    const sliderRange = this.rangeView.render();
    const sliderThumbs = this.thumbs.map((thumb: ISliderThumbView) => thumb.getElement());

    this.container.append(sliderWrapper);
    if (showMarks) {
      this.marksView = new SliderMarksView(this.presenter.getDivisions(), this);
      sliderWrapper.append(this.marksView.render());
    } else if (showMinAndMax) {
      const marks = this.presenter.getDivisions();
      const marksData = [marks[0], marks[marks.length - 1]];
      this.marksView = new SliderMarksView(marksData, this);
      sliderWrapper.append(this.marksView.render());
    }
    sliderWrapper.append(sliderControls);
    sliderControls.append([sliderRange, ...sliderThumbs]);

    if (showThumbValue && !showMarks && !showMinAndMax) {
      this.container.addClass(DOMHelper.getEnabledThumbMarksModifierClass());
    }
    if (vertical) {
      this.container.addClass(DOMHelper.getVerticalClass());
    }
    this.element = sliderWrapper;
  }

  setThumbPosition(thumbIndex: number, pos: number): void {
    this.thumbs[thumbIndex].setPosition(pos);
  }

  setSmoothClass(): void {
    const eventClass = DOMHelper.getThumbViewMouseUpEventClass();
    const container = this.getContainer();
    container.addClass(eventClass);
    setTimeout(() => {
      container.removeClass(eventClass);
    }, 200);
  }

  getContainer(): JQuery<HTMLElement> {
    return this.container;
  }

  getRect(): DOMRect {
    return this.element[0].getBoundingClientRect();
  }

  getThumbs(): ISliderThumbView[] {
    return this.thumbs;
  }

  getSliderSize(): number {
    const { vertical } = this.presenter.getViewProps();
    let result: number;
    if (vertical) result = this.getRect().height;
    else result = this.getRect().width;
    return result;
  }

  updateProgressPosition(thumbData?: ProgressThumbData): void {
    if (thumbData) this.rangeView.updateProgress(thumbData);
    else this.rangeView.updateProgress();
  }

  updateThumb(index: number, pos: number): void {
    const thumb = this.thumbs[index];
    thumb.setPosition(pos);
    const { showThumbValue } = this.presenter.getViewProps();
    const updatedValue = this.presenter.updateThumbValue(index, pos);
    if (showThumbValue) thumb.updateMarkValue(updatedValue);
  }

  moveClosestThumbToPos(pos: number): void {
    const { smooth } = this.presenter.getViewProps();
    if (smooth) this.setSmoothClass();
    const closestThumb = this.presenter.getClosestThumb(pos);
    const closestPos = this.presenter.getClosestPos(pos);
    this.updateThumb(closestThumb, closestPos);
    this.rangeView.updateProgress();
  }

  render(target: JQuery<HTMLElement>): void {
    const { thumbs, beforeRender } = this.presenter.getViewProps();

    if (beforeRender) beforeRender();

    target.append(this.container[0]);
    this.thumbs.forEach((thumb, index) => {
      const convertedPos = this.presenter.convertSliderValueToDOMPos(thumbs[index]);
      thumb.setPosition(convertedPos);
    });
    this.updateProgressPosition();
  }

  destroy(): void {
    this.container.remove();
  }
}

export default SliderView;
