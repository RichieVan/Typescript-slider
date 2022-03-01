import $ from 'jquery';

import ISliderRangeView from '../../interface/ISliderRangeView';
import ISliderView from '../../interface/ISliderView';
import ProgressDotData from '../../type/ProgressDotData';
import DOMHelper from '../helpers/DOMHelper';

class SliderRangeView implements ISliderRangeView {
  wrapper: JQuery<HTMLElement>;

  range: JQuery<HTMLElement>;

  progressBar: JQuery<HTMLElement>;

  constructor(public parentView: ISliderView) {
    [this.wrapper, this.range, this.progressBar] = this.compileElement();
  }

  updateProgress(dotData?: ProgressDotData): void {
    const emptyClass = DOMHelper.getProgressBarEmptyClass();
    const fullClass = DOMHelper.getProgressBarFullClass();
    const { dots, smooth } = this.parentView.presenter.getViewProps();

    if (dots.length > 1) {
      let from = this.parentView.presenter.convertSliderValueToDOMPos(dots[0]);
      let to = this.parentView.presenter.convertSliderValueToDOMPos(dots[1]);

      if (dotData && smooth) {
        if (dotData.index === 0) from = dotData.pos;
        if (dotData.index === 1) to = dotData.pos;
      }

      if (from === 0) this.progressBar.addClass(emptyClass);
      else if (this.progressBar.hasClass(emptyClass)) this.progressBar.removeClass(emptyClass);
      if (to === 100) this.progressBar.addClass(fullClass);
      else if (this.progressBar.hasClass(fullClass)) this.progressBar.removeClass(fullClass);

      this.progressBar.css({
        left: `${from}%`,
        width: `${to - from}%`,
      });
    } else {
      let to = this.parentView.presenter.convertSliderValueToDOMPos(dots[0]);

      if (dotData && smooth) {
        to = dotData.pos;
      }

      if (to === 0) this.progressBar.addClass(emptyClass);
      else if (this.progressBar.hasClass(emptyClass)) this.progressBar.removeClass(emptyClass);
      if (to === 100) this.progressBar.addClass(fullClass);
      else if (this.progressBar.hasClass(fullClass)) this.progressBar.removeClass(fullClass);

      this.progressBar.css({ width: `${to}%` });
    }
  }

  getRangeRect(): DOMRect {
    return this.range[0].getBoundingClientRect();
  }

  mouseClickHandler(e: JQuery.ClickEvent): void {
    const pos = ((e.clientX - this.getRangeRect().left) / this.getRangeRect().width) * 100;
    const closestDot = this.parentView.presenter.getClosestDot(pos);
    const closestPos = this.parentView.presenter.getClosestPos(pos);
    // this.parentView.presenter.updateDotValue(closestDot, closestPos);
    // this.parentView.setDotPosition(closestDot, closestPos);
    this.parentView.updateDot(closestDot, closestPos);
    this.updateProgress();
  }

  compileElement(): JQuery<HTMLElement>[] {
    const [wrapper, range, progress] = DOMHelper.createRangeElement();

    wrapper.on('dragstart', () => false);

    range.on('click', (e: JQuery.ClickEvent) => {
      this.mouseClickHandler(e);
    });

    return [wrapper, range, progress];
  }

  render(): JQuery<HTMLElement> {
    return this.wrapper;
  }
}

export default SliderRangeView;
