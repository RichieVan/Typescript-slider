import DOMHelper from '../helpers/DOMHelper';
import ISliderMarksView from '../../interface/ISliderMarksView';
import ISliderView from '../../interface/ISliderView';

class SliderMarksView implements ISliderMarksView {
  private container: JQuery<HTMLElement>;

  constructor(
    marksObject: number[],
    private parentView: ISliderView,
  ) {
    this.container = this.compile(marksObject);
  }

  private mouseClickHandler(value: number): void {
    const pos = this.parentView.presenter.convertSliderValueToDOMPos(value);
    this.parentView.moveClosestDotToPos(pos);
  }

  compile(data: number[]) {
    const container = DOMHelper.createDivisionsContainerElement();
    data.forEach((val) => {
      const mark = DOMHelper.createDivisionElement(val);
      mark.on('click', () => this.mouseClickHandler(val));
      container.append(mark);
    });

    return container;
  }

  render(): JQuery<HTMLElement> {
    return this.container;
  }
}

export default SliderMarksView;
