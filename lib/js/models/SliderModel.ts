import ISliderModel from '../../interface/ISliderModel';
import { SliderModelValues } from '../../type/SliderModel';
import SliderProps from '../../type/SliderProps';
import SliderViewProps from '../../type/SliderViewProps';

class SliderModel implements ISliderModel {
  private min: number;

  private max: number;

  private step: number;

  private values: number[];

  private thumbsValues: number[];

  private smooth: boolean;

  private range: boolean;

  private showThumbValue: boolean;

  private showMarks: boolean;

  private showMinAndMax: boolean;

  constructor(props: SliderProps) {
    this.min = props.min || 0;
    this.max = props.max || 10;
    this.step = props.step || (this.getLength() / 20);
    this.values = props.values || this.calculateValues();
    this.smooth = props.smooth || false;
    this.range = props.range || false;
    this.showThumbValue = props.showThumbValue || false;
    this.showMarks = props.showMarks || false;
    this.showMinAndMax = props.showMinAndMax || false;

    if (props.thumbsValues && this.range) this.thumbsValues = props.thumbsValues;
    else if (props.thumbsValues) this.thumbsValues = [props.thumbsValues[0]];
    else if (this.range) this.thumbsValues = [this.min, this.max];
    else this.thumbsValues = [this.min];

    if (this.min >= this.max) {
      throw new Error('Минимальное значение не может быть больше максимального');
    }

    if (this.step > this.getLength()) {
      throw new Error('Шаг не может быть больше разницы минимального и максимального значения');
    }
  }

  setThumbsValues(thumbs: number[]): void {
    this.thumbsValues = thumbs;
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
      thumbs: this.thumbsValues,
      smooth: this.smooth,
      range: this.range,
      showThumbValue: this.showThumbValue,
      showMarks: this.showMarks,
      showMinAndMax: this.showMinAndMax,
    };

    return viewProps;
  }

  getDivisionsValues(): number[] {
    const values = this.getValues();
    return values;
  }

  getThumbsValues(): number[] {
    return this.thumbsValues;
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

  getClosestThumbIndex(target: number): number {
    let closestIndex = 0;
    this.thumbsValues.reduce((max, value, index) => {
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
