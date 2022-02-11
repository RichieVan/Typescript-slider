import { expect, assert } from 'chai';
import ISliderModel from '../../lib/interface/ISliderModel';
import SliderProps from '../../lib/type/SliderProps';
import SliderModel from '../../lib/js/models/SliderModel';

type ModelInstance = null | ISliderModel;

let modelInstance: ModelInstance = null;

const SliderModelTests = function () {
  describe('Тесты model', () => {
    describe('Валидация присваивания пропсов при инициализации', () => {
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

    describe('Получение ближайшего значения из списка', () => {
      it('Вернуть индекс одного значения из списка ближайшего к 4', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
          values: [0, 10],
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getIndexOfClosestValue(4), 0);
      });

      it('Вернуть индекс одного значения из списка ближайшего к 5', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
          values: [0, 10],
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getIndexOfClosestValue(5), 1);
      });

      it('Вернуть индекс одного значения из списка ближайшего к 8', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
          values: [0, 10],
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getIndexOfClosestValue(8), 1);
      });
    });
  });
};

export default SliderModelTests;
