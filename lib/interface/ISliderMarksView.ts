import MarksData from '../type/MarksData';

interface ISliderMarksView {
  compile(data: MarksData[]): JQuery<HTMLElement>;
  render(): JQuery<HTMLElement>;
}

export default ISliderMarksView;
