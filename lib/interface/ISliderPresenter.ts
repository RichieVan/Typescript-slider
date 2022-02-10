import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
  destroy(): void;
}

export default ISliderPresenter;