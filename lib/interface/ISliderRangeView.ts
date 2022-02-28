import ProgressDotData from '../type/ProgressDotData';
import type ISliderView from './ISliderView';

interface ISliderRangeView {
  updateProgress(dotData?: ProgressDotData): void;
  getRangeRect(): DOMRect;
  mouseClickHandler(e: JQuery.ClickEvent): void;
  compileElement(): JQuery<HTMLElement>[];
  render(): JQuery<HTMLElement>;
}

export default ISliderRangeView;
