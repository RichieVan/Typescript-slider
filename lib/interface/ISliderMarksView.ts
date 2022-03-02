interface ISliderMarksView {
  compile(data: number[]): JQuery<HTMLElement>;
  render(): JQuery<HTMLElement>;
}

export default ISliderMarksView;
