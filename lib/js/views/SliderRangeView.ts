import $ from 'jquery';

import ISliderRangeView from '../../interface/ISliderRangeView';
import ISliderView from '../../interface/ISliderView';
import ProgressThumbData from '../../type/ProgressThumbData';
import DOMHelper from '../helpers/DOMHelper';

class SliderRangeView implements ISliderRangeView {
  wrapper: JQuery<HTMLElement>;

  range: JQuery<HTMLElement>;

  progressBar: JQuery<HTMLElement>;

  constructor(public parentView: ISliderView) {
    [this.wrapper, this.range, this.progressBar] = this.compileElement();
  }

  updateProgress(thumbData?: ProgressThumbData): void {
    const emptyClass = DOMHelper.getProgressBarEmptyClass();
    const fullClass = DOMHelper.getProgressBarFullClass();
    const { thumbs, smooth } = this.parentView.presenter.getViewProps();

    if (thumbs.length > 1) {
      let from = this.parentView.presenter.convertSliderValueToDOMPos(thumbs[0]);
      let to = this.parentView.presenter.convertSliderValueToDOMPos(thumbs[1]);

      if (thumbData && smooth) {
        if (thumbData.index === 0) from = thumbData.pos;
        if (thumbData.index === 1) to = thumbData.pos;
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
      let to = this.parentView.presenter.convertSliderValueToDOMPos(thumbs[0]);

      if (thumbData && smooth) {
        to = thumbData.pos;
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
    this.parentView.moveClosestThumbToPos(pos);
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
