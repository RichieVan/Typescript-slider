import ISliderModel from '../../interface/ISliderModel';
import SliderProps from '../../type/SliderProps';

class SliderModel implements ISliderModel {
  min: number;

  max: number;

  step: number;

  values: number[];

  constructor(props: SliderProps) {
    this.min = props.min;
    this.max = props.max;
    this.step = props.step || ((this.max - this.min) / 100);
    this.values = props.values || [0];

    if (this.min >= this.max) {
      throw new Error('Минимальное значение не может быть больше максимального');
    }

    if (this.step > (this.max - this.min)) {
      throw new Error('Шаг не может быть больше разницы минимального и максимального значения');
    }
  }

  getStep(): number {
    return this.step;
  }

  getLenght(): number {
    return (this.max - this.min);
  }

  getIndexOfClosestValue(target: number): number {
    let closestIndex = 0;
    this.values.reduce((max, value, index) => {
      const diff = Math.abs(value - target);
      if (diff <= max) {
        closestIndex = index;
        return diff;
      }
      return max;
    }, this.max);
    return closestIndex;
  }
}

export default SliderModel;
