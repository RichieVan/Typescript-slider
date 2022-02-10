import { expect } from 'chai';
import ISliderModel from '../../lib/interface/ISliderModel';
import SliderProps from '../../lib/type/SliderProps';
import SliderModel from '../../lib/js/models/SliderModel';

type ModelInstance = null | ISliderModel;

let modelInstance: ModelInstance = null;

const SliderModelTests = function () {
  describe('Тестирование присваивания пропсов', () => {
    it('Выдать ошибку если значение min больше чем значение max', () => {
      const modelProps: SliderProps = {
        min: 5,
        max: 3,
        step: 1,
      };

      const throwableFunction = function (): ISliderModel {
        modelInstance = new SliderModel(modelProps);
        return modelInstance;
      };

      expect(throwableFunction).to.throw('Минимальное значение не может быть больше максимального');
    });

    it('Выдать ошибку если значение step больше разницы значений min и max', () => {
      const modelProps: SliderProps = {
        min: 3,
        max: 5,
        step: 3,
      };

      const throwableFunction = function (): ISliderModel {
        modelInstance = new SliderModel(modelProps);
        return modelInstance;
      };

      expect(throwableFunction).to.throw('Шаг не может быть больше разницы минимального и максимального значения');
    });
  });
};

export default SliderModelTests;
