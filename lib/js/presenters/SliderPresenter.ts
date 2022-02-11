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
    this.view = new SliderView(this);
    this.model = new SliderModel(props);

    this.view.render();
  }

  getClosestDotIndex(pos: number): number {
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const closestDotIndex = this.model.getIndexOfClosestValue(convertedPos);

    return closestDotIndex;
  }

  convertDOMPosToSliderValue(pos: number): number {
    const length = this.model.getLenght();
    const sliderWidth = this.view.getSliderWidth();
    const result = pos / (sliderWidth / length);

    return result;
  }

  destroy(): void {
    this.view.destroy();
  }
}

export default SliderPresenter;
