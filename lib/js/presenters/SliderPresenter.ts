import ISliderModel from '../../interface/ISliderModel';
import ISliderPresenter from '../../interface/ISliderPresenter';
import SliderProps from '../../type/SliderProps';
import ISliderView from '../../interface/ISliderView';
import SliderModel from '../models/SliderModel';
import SliderView from '../views/SliderView';
import ISliderDotView from '../../interface/ISliderDotView';
import SliderDotView from '../views/SliderDotView';

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

  convertDOMPosToSliderValue(pos: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderWidth();
    const result = this.model.getMin() + pos / (sliderWidth / length);

    return result;
  }

  convertSliderValueToDOMPos(val: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderWidth();
    const result = (sliderWidth / length) * (val - this.model.getMin());

    return result;
  }

  destroy(): void {
    this.view.destroy();
  }
}

export default SliderPresenter;
