import ProgressThumbData from '../type/ProgressThumbData';
import type ISliderView from './ISliderView';

interface ISliderRangeView {
  updateProgress(thumbData?: ProgressThumbData): void;
  getRangeRect(): DOMRect;
  mouseClickHandler(e: JQuery.ClickEvent): void;
  compileElement(): JQuery<HTMLElement>[];
  render(): JQuery<HTMLElement>;
}

export default ISliderRangeView;
