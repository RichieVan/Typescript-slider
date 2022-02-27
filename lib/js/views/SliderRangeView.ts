import $ from 'jquery';

import ISliderRangeView from '../../interface/ISliderRangeView';
import ISliderView from '../../interface/ISliderView';
import DOMHelper from '../helpers/DOMHelper';

class SliderRangeView implements ISliderRangeView {
  wrapper: JQuery<HTMLElement>;

  range: JQuery<HTMLElement>;

  progressBar: JQuery<HTMLElement>;

  constructor(public parentView: ISliderView) {
    [this.wrapper, this.range, this.progressBar] = this.compileElement();
  }

  setProgress(to: number): void;
  setProgress(to: number, from: number): void;
  setProgress(to: number, from?: number): void {
    const emptyClass = DOMHelper.getProgressBarEmptyClass();
    const fullClass = DOMHelper.getProgressBarFullClass();

    this.progressBar.removeClass(`${emptyClass} ${fullClass}`);
    if (from) {
      if (from === 0) this.progressBar.addClass(emptyClass);
      if (to === 100) this.progressBar.addClass(fullClass);

      this.progressBar.css({
        left: `${from}%`,
        width: `${to - from}%`,
      });
    } else {
      if (to === 0) this.progressBar.addClass(emptyClass);
      if (to === 100) this.progressBar.addClass(fullClass);

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
    this.parentView.setDotPosition(closestDot, closestPos);
    this.parentView.setProgressPosition(closestPos);
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
