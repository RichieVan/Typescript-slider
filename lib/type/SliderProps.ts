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
  onChange?: (({ values }: { values: number[] }) => void) | null;
};

export default SliderProps;
