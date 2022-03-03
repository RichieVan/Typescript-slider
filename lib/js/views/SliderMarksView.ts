import DOMHelper from '../helpers/DOMHelper';
import ISliderMarksView from '../../interface/ISliderMarksView';
import ISliderView from '../../interface/ISliderView';
import MarksData from '../../type/MarksData';

class SliderMarksView implements ISliderMarksView {
  private container: JQuery<HTMLElement>;

  constructor(
    marksObject: MarksData[],
    private parentView: ISliderView,
  ) {
    this.container = this.compile(marksObject);
  }

  private mouseClickHandler(value: number): void {
    const pos = this.parentView.presenter.convertSliderValueToDOMPos(value);
    this.parentView.moveClosestThumbToPos(pos);
  }

  compile(data: MarksData[]) {
    const container = DOMHelper.createDivisionsContainerElement();
    data.forEach((dataValue) => {
      const { value, offset } = dataValue;
      const mark = DOMHelper.createDivisionElement(value);
      mark.on('click', () => this.mouseClickHandler(value));
      mark.css({ left: `${offset}%` });
      container.append(mark);
    });

    return container;
  }

  render(): JQuery<HTMLElement> {
    return this.container;
  }
}

export default SliderMarksView;
