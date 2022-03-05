type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  current?: number;
  values?: number[];
  smooth?: boolean;
  range?: boolean;
  thumbsValues?: number[];
  showThumbValue?: boolean;
  showMarks?: boolean;
  showMinAndMax?: boolean;
  vertical?: boolean;
};

export default SliderProps;
