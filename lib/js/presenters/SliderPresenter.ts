import ISliderModel from '../../interface/ISliderModel';
import ISliderPresenter from '../../interface/ISliderPresenter';
import SliderProps from '../../type/SliderProps';
import ISliderView from '../../interface/ISliderView';
import SliderModel from '../models/SliderModel';
import SliderView from '../views/SliderView';

class SliderPresenter implements ISliderPresenter {
  view: ISliderView;

  model: ISliderModel;

  constructor(props: SliderProps) {
    this.view = new SliderView();
    this.model = new SliderModel(props);

    this.view.render();
  }

  destroy(): void {
    this.view.destroy();
  }
}

export default SliderPresenter;
