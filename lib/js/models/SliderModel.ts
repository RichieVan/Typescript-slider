import ISliderModel from '../../interface/ISliderModel';
import MarksData from '../../type/MarksData';
import { SliderModelValues } from '../../type/SliderModel';
import SliderProps from '../../type/SliderProps';
import SliderViewProps from '../../type/SliderViewProps';
import { BeforeRenderCallback, OnChangeCallback } from '../../type/types';

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

  private vertical: boolean;

  private onChange: (({ values }: { values: number[] }) => void) | null;

  private beforeRender: BeforeRenderCallback;

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
    this.vertical = props.vertical || false;
    this.onChange = props.onChange || null;
    this.beforeRender = props.beforeRender || null;

    if (props.thumbsValues && this.range) this.thumbsValues = props.thumbsValues;
    else if (props.thumbsValues) this.thumbsValues = [props.thumbsValues[0]];
    else if (this.range) this.thumbsValues = [this.min, this.max];
    else this.thumbsValues = [this.min];

    this.validate();
  }

  setMin(val: number): void {
    this.min = val;
    this.setValues(this.calculateValues());
    const updatedThumbs = this.thumbsValues.map((thumbValue) => {
      if (thumbValue < this.min) {
        return this.min;
      }
      return this.getClosestValue(thumbValue);
    });
    this.setThumbsValues(updatedThumbs);
  }

  setMax(val: number): void {
    this.max = val;
    this.setValues(this.calculateValues());
    const updatedThumbs = this.thumbsValues.map((thumbValue) => {
      if (thumbValue > this.max) {
        return this.max;
      }
      return this.getClosestValue(thumbValue);
    });
    this.setThumbsValues(updatedThumbs);
  }

  setStep(val: number): void {
    this.step = val;
    this.setValues(this.calculateValues());
    const updatedThumbs = this.thumbsValues.map((thumbValue) => this.getClosestValue(thumbValue));
    this.setThumbsValues(updatedThumbs);
  }

  setSmooth(val: boolean): void {
    this.smooth = val;
  }

  setRange(val: boolean): void {
    this.range = val;
    if (val === true) {
      this.thumbsValues = [this.thumbsValues[0], this.max];
    } else {
      this.thumbsValues = [this.thumbsValues[0]];
    }
  }

  setShowThumbValue(val: boolean): void {
    this.showThumbValue = val;
  }

  setShowMarks(val: boolean): void {
    this.showMarks = val;
  }

  setShowMinAndMax(val: boolean): void {
    this.showMinAndMax = val;
  }

  setVertical(val: boolean): void {
    this.vertical = val;
  }

  setThumbsValues(thumbs: number[]): void {
    const isThumbChanged = this.thumbsValues[0] !== thumbs[0] || this.thumbsValues[1] !== thumbs[1];
    if (this.onChange && isThumbChanged) {
      this.thumbsValues = thumbs;
      this.onChange({ values: this.thumbsValues });
    }
  }

  setValues(values: number[]): void {
    this.values = values;
  }

  setOnChangeCallback(callback: OnChangeCallback): void {
    this.onChange = callback;
  }

  setBeforeRenderCallback(callback: BeforeRenderCallback): void {
    this.beforeRender = callback;
  }

  getMin(): number {
    return this.min;
  }

  getMax(): number {
    return this.max;
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
      vertical: this.vertical,
      beforeRender: this.beforeRender,
    };

    return viewProps;
  }

  getDivisionsValues(): MarksData[] {
    const values = this.getValues();
    const data = values.map((value) => {
      const offset = Math.round(((value - this.min) / (this.max - this.min)) * 10000) / 100;
      return { value, offset };
    });
    return data;
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

      if (diff === max && value < target) closestIndex = index;
      else if (diff < max) {
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
    const steps = Math.ceil(this.getLength() / step);

    for (let i = 0; i < steps; i += 1) {
      const value = Math.round((min + i * step) * 1000) / 1000;
      values.push(value);
    }
    values.push(max);

    return values;
  }

  private validate(): void {
    if (this.min >= this.max) {
      throw new Error('Минимальное значение не может быть больше максимального');
    }

    if (this.step > this.getLength()) {
      throw new Error('Шаг не может быть больше разницы минимального и максимального значения');
    }
  }
}

export default SliderModel;
