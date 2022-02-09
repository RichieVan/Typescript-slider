import ISliderModel from "../../interface/ISliderModel";
import ISliderPresenter from "../../interface/ISliderPresenter";
import ISliderView from "../../interface/ISliderView";
import SliderModel from "../models/SliderModel";
import SliderView from "../views/SliderView";

class SliderPresenter implements ISliderPresenter {
  view: ISliderView;

  model: ISliderModel;

  constructor() {
    this.view = new SliderView();
    this.model = new SliderModel();

    this.view.render();
  }
}

export default SliderPresenter;