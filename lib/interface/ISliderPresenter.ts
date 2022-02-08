import ISliderView from './ISliderView';
import ISliderModel from './ISliderModel';

interface ISliderPresenter {
  view: ISliderView;
  model: ISliderModel;
}

export default ISliderPresenter;