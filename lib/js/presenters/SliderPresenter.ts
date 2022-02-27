import ISliderModel from '../../interface/ISliderModel';
import ISliderPresenter from '../../interface/ISliderPresenter';
import SliderProps from '../../type/SliderProps';
import ISliderView from '../../interface/ISliderView';
import SliderModel from '../models/SliderModel';
import SliderView from '../views/SliderView';
import SliderViewProps from '../../type/SliderViewProps';

class SliderPresenter implements ISliderPresenter {
  view: ISliderView;

  model: ISliderModel;

  constructor(props: SliderProps) {
    this.model = new SliderModel(props);
    this.view = new SliderView(this);

    this.view.render();
  }

  getClosestDot(pos: number): number {
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const value = this.model.getClosestValue(convertedPos);
    const dotIndex = this.model.getClosestDotIndex(value);

    return dotIndex;
  }

  getClosestPos(pos: number): number {
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const value = this.model.getClosestValue(convertedPos);
    const closestPos = this.convertSliderValueToDOMPos(value);

    return closestPos;
  }

  getDivisions(): number[] {
    const divisions = this.model.getDivisionsValues();
    return divisions;
  }

  getViewProps(): SliderViewProps {
    const viewProps: SliderViewProps = this.model.getViewProps();
    return viewProps;
  }

  // updateModel(props: SliderProps): void {
  //   Object.keys(props).forEach((key: string) => {
  //     if (key === 'dotsValues' && props.dotsValues) this.model.setDots(props.dotsValues);
  //   });
  // }

  updateDotValue(index: number, pos: number): void {
    const modelValues = this.model.getDotsValues();
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const updatedValue = this.model.getClosestValue(convertedPos);
    modelValues[index] = updatedValue;
    this.model.setDotsValues(modelValues);
  }

  convertDOMPosToSliderValue(pos: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderWidth();
    const result = Math.round((this.model.getMin() + ((sliderWidth / 100) * pos) / (sliderWidth / length)) * 100) / 100;

    return result;
  }

  convertSliderValueToDOMPos(val: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderWidth();
    const pixelPos = (sliderWidth / length) * (val - this.model.getMin());
    const percentPos = Math.round((pixelPos / sliderWidth) * 100000) / 1000;

    return percentPos;
  }

  destroy(): void {
    this.view.destroy();
  }
}

export default SliderPresenter;
