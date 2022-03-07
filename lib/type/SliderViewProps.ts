import { BeforeRenderCallback } from './types';

type SliderViewProps = {
  smooth: boolean;
  range: boolean;
  thumbs: number[];
  showThumbValue: boolean;
  showMarks: boolean;
  showMinAndMax: boolean;
  vertical: boolean;
  beforeRender: BeforeRenderCallback;
};

export default SliderViewProps;
