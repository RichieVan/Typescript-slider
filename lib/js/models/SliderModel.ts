import ISliderModel from '../../interface/ISliderModel';
import { SliderModelValues } from '../../type/SliderModel';
import SliderProps from '../../type/SliderProps';
import SliderViewProps from '../../type/SliderViewProps';

class SliderModel implements ISliderModel {
  private min: number;

  private max: number;

  private step: number;

  private values: number[];

  private dotsValues: number[];

  private smooth: boolean;

  private range: boolean;

  constructor(props: SliderProps) {
    this.min = props.min || 0;
    this.max = props.max || 10;
    this.step = props.step || (this.getLength() / 20);
    this.values = props.values || this.calculateValues();
    this.smooth = props.smooth || false;
    this.range = props.range || false;

    if (props.dotsValues && this.range) this.dotsValues = props.dotsValues;
    else if (props.dotsValues) this.dotsValues = [props.dotsValues[0]];
    else if (this.range) this.dotsValues = [this.min, this.max];
    else this.dotsValues = [this.min];

    if (this.min >= this.max) {
      throw new Error('Минимальное значение не может быть больше максимального');
    }

    if (this.step > this.getLength()) {
      throw new Error('Шаг не может быть больше разницы минимального и максимального значения');
    }
  }

  setDotsValues(dots: number[]): void {
    this.dotsValues = dots;
  }

  getMin(): number {
    return this.min;
  }

  getStep(): number {
    return this.step;
  }

  getLength(): number {
    const length = this.max - this.min;
    return length;
  }

  getValues(): number[] {
    return this.values;
  }

  getViewProps(): SliderViewProps {
    const viewProps: SliderViewProps = {
      dots: this.dotsValues,
      smooth: this.smooth,
      range: this.range,
    };

    return viewProps;
  }

  getDivisionsValues(): number[] {
    const values = this.getValues();
    return values;
  }

  getDotsValues(): number[] {
    return this.dotsValues;
  }

  getClosestValue(target: number): number {
    let closestVal = 0;
    this.values.reduce((max, value) => {
      const diff = Math.abs(value - target);

      if (diff <= max) {
        closestVal = value;
        return diff;
      }
      return max;
    }, this.getLength());
    return closestVal;
  }

  getClosestDotIndex(target: number): number {
    let closestIndex = 0;
    this.dotsValues.reduce((max, value, index) => {
      const diff = Math.abs(value - target);

      if (diff <= max) {
        closestIndex = index;
        return diff;
      }
      return max;
    }, this.getLength());
    return closestIndex;
  }

  calculateValues(): number[] {
    const { min, max, step } = this;
    const values: SliderModelValues = [];
    const steps = Math.round(this.getLength() / step);

    for (let i = 0; i < steps; i += 1) {
      const value = Math.round((min + i * step) * 1000) / 1000;
      values.push(value);
    }
    values.push(max);

    return values;
  }
}

export default SliderModel;
