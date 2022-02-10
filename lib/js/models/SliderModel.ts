import ISliderModel from "../../interface/ISliderModel";
import SliderProps from "../../type/SliderProps";

class SliderModel implements ISliderModel {
  min: number;

  max: number;

  step: number;

  value: number;

  constructor(props: SliderProps) {
    this.min = props.min;
    this.max = props.max;
    this.step = props.step || ((this.max - this.min) / 100);
    this.value = props.current || 0;

    if (this.min >= this.max) {
      throw new Error('Минимальное значение не может быть больше максимального');
    }

    if (this.step > (this.max - this.min)) {
      throw new Error('Шаг не может быть больше разницы минимального и максимального значения');
    }
  }
}

export default SliderModel;