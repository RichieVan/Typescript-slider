import MarksData from '../type/MarksData';
import SliderProps from '../type/SliderProps';
import SliderViewProps from '../type/SliderViewProps';
import { BeforeRenderCallback, OnChangeCallback } from '../type/types';

interface ISliderModel {
  setThumbsValues(thumbs: number[]): void;
  setMin(val: number): void
  setMax(val: number): void
  setStep(val: number): void;
  setSmooth(val: boolean): void;
  setRange(val: boolean): void;
  setShowThumbValue(val: boolean): void;
  setShowMarks(val: boolean): void;
  setShowMinAndMax(val: boolean): void;
  setVertical(val: boolean): void;
  setOnChangeCallback(callback: OnChangeCallback): void;
  setBeforeRenderCallback(callback: BeforeRenderCallback): void;
  getMin(): number;
  getMax(): number;
  getStep(): number;
  getLength(): number;
  getValues(): number[];
  getViewProps(): SliderViewProps;
  getThumbsValues(): number[];
  getClosestValue(target: number): number;
  getClosestThumbIndex(target: number): number;
  getDivisionsValues(): MarksData[];
  calculateValues(): number[];
}
export default ISliderModel;
