import {assert, expect} from "chai";
import ISliderModel from "../../lib/interface/ISliderModel";
import SliderProps from "../../lib/type/SliderProps";
import SliderModel from '../../lib/js/models/SliderModel';

type modelInstanceType = null | ISliderModel;

let modelInstance: modelInstanceType = null;

const SliderModelTests = function () {
  describe('Тестирование присваивания пропсов', function () {
    it('Значение min больше чем значение max выдаст ошибку', function () {
      const modelProps: SliderProps = {
        min: 5,
        max: 3,
        step: 1
      };

      const throwableFunction = function(): void {
        modelInstance = new SliderModel(modelProps);
        console.log(modelInstance);
      }

      expect(throwableFunction).to.throw('Минимальное значение не может быть больше максимального');
    })

    it('Значение step больше разницы значений min и max выдаст ошибку', function () {
      const modelProps: SliderProps = {
        min: 3,
        max: 5,
        step: 3
      };

      const throwableFunction = function(): void {
        modelInstance = new SliderModel(modelProps);
      }

      expect(throwableFunction).to.throw('Шаг не может быть больше разницы минимального и максимального значения');
    })
  })
}

export default SliderModelTests;