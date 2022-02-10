import {assert, expect} from "chai";
import ISliderPresenter from "../../lib/interface/ISliderPresenter";
import SliderPresenter from '../../lib/js/presenters/SliderPresenter';

type sliderInstanceType = null | ISliderPresenter;

let sliderInstance: sliderInstanceType = null;

const SliderPresenterTests = function () {
  // describe('Тестирование присваивания пропсов', function () {
  //   this.afterEach(function () {
  //     if (sliderInstance) {
  //       sliderInstance.destroy();
  //       sliderInstance = null;
  //     }
  //   })

  //   it('Проброс ошибки если min больше чем max', function () {
  //     const throwableFunction = function(): void {
  //       sliderInstance = new SliderPresenter({
  //         min: 5,
  //         max: 3,
  //         step: 1
  //       });
  //     }

  //     expect(throwableFunction).to.throw();
  //   })
  // })
}

export default SliderPresenterTests;