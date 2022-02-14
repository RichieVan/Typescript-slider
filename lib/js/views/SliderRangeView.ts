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

  setProgress(pos: number): void {
    if (pos === 0) this.progressBar.addClass(DOMHelper.getProgressBarEmptyClass());
    if (pos === 100) this.progressBar.addClass(DOMHelper.getProgressBarFullClass());
    this.progressBar.css({ width: `${pos}%` });
  }

  getRangeRect(): DOMRect {
    return this.range[0].getBoundingClientRect();
  }

  mouseClickHandler(e: JQuery.ClickEvent): void {
    const pos = e.clientX - this.getRangeRect().left;
    const closestDot = this.parentView.presenter.getClosestDot(pos);
    const closestPos = this.parentView.presenter.getClosestPos(pos);
    this.parentView.setDotPosition(closestDot, closestPos);
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
