import ISliderModel from '../../interface/ISliderModel';
import ISliderPresenter from '../../interface/ISliderPresenter';
import SliderProps from '../../type/SliderProps';
import ISliderView from '../../interface/ISliderView';
import SliderModel from '../models/SliderModel';
import SliderView from '../views/SliderView';
import SliderViewProps from '../../type/SliderViewProps';
import MarksData from '../../type/MarksData';

class SliderPresenter implements ISliderPresenter {
  view: ISliderView;

  model: ISliderModel;

  constructor(
    private target: JQuery<HTMLElement>,
    props: SliderProps,
  ) {
    this.model = new SliderModel(props);
    this.view = new SliderView(this);

    this.view.render(target);
  }

  setMin(val: number): void {
    this.model.setMin(val);
    this.updateView();
  }

  setMax(val: number): void {
    this.model.setMax(val);
    this.updateView();
  }

  setStep(val: number): void {
    this.model.setStep(val);
    this.updateView();
  }

  setThumbs(val: number[]): void {
    this.model.setThumbsValues(val);
    this.updateView();
  }

  setToggableProp<K extends keyof SliderProps>(key: K, val: boolean): void {
    if (key === 'smooth') this.model.setSmooth(val);
    else if (key === 'range') this.model.setRange(val);
    else if (key === 'showThumbValue') this.model.setShowThumbValue(val);
    else if (key === 'showMarks') this.model.setShowMarks(val);
    else if (key === 'showMinAndMax') this.model.setShowMinAndMax(val);
    else if (key === 'vertical') this.model.setVertical(val);
    this.updateView();
  }

  getClosestValue(pos: number): number {
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const value = this.model.getClosestValue(convertedPos);

    return value;
  }

  getClosestThumb(pos: number): number {
    const value = this.getClosestValue(pos);
    const thumbIndex = this.model.getClosestThumbIndex(value);

    return thumbIndex;
  }

  getClosestPos(pos: number): number {
    const value = this.getClosestValue(pos);
    const closestPos = this.convertSliderValueToDOMPos(value);

    return closestPos;
  }

  getDivisions(): MarksData[] {
    const divisions: MarksData[] = this.model.getDivisionsValues();
    return divisions;
  }

  getViewProps(): SliderViewProps {
    const viewProps: SliderViewProps = this.model.getViewProps();
    return viewProps;
  }

  updateThumbValue(index: number, pos: number): number {
    let modelValues: number[] = [];
    modelValues = modelValues.concat(this.model.getThumbsValues());
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const updatedValue = this.model.getClosestValue(convertedPos);
    modelValues[index] = updatedValue;
    this.model.setThumbsValues(modelValues);
    return updatedValue;
  }

  convertDOMPosToSliderValue(pos: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderSize();
    const pixelPos = (sliderWidth / 100) * pos;
    const markPixelLength = sliderWidth / length;
    const result = Math.round((this.model.getMin() + pixelPos / markPixelLength) * 100) / 100;

    return result;
  }

  convertSliderValueToDOMPos(val: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderSize();
    const pixelPos = (sliderWidth / length) * (val - this.model.getMin());
    const percentPos = Math.round((pixelPos / sliderWidth) * 100000) / 1000;

    return percentPos;
  }

  updateView(): void {
    this.view.destroy();
    this.view = new SliderView(this);
    this.view.render(this.target);
  }
}

export default SliderPresenter;
