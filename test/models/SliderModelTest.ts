import { expect, assert } from 'chai';
import ISliderModel from '../../lib/interface/ISliderModel';
import SliderProps from '../../lib/type/SliderProps';
import SliderModel from '../../lib/js/models/SliderModel';
import { SliderModelValues } from '../../lib/type/SliderModel';

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
      it('Вернуть значениe из списка ближайшее к 4', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestValue(4), 4);
      });

      it('Вернуть значениe из списка ближайшее к 5.5', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestValue(5.5), 6);
      });

      it('Вернуть значениe из списка ближайшее к 3', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 2,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestValue(3), 4);
      });

      it('Вернуть значениe из списка ближайшее к 2.999', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 2,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestValue(2.999), 2);
      });

      it('Вернуть значениe из списка ближайшее к 4', () => {
        const modelProps: SliderProps = {
          min: -100,
          max: 100,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestValue(4), 4);
      });

      it('Вернуть значениe из списка ближайшее к 60', () => {
        const modelProps: SliderProps = {
          min: -100,
          max: 100,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestValue(60), 60);
      });

      it('Вернуть значениe из списка ближайшее к -60', () => {
        const modelProps: SliderProps = {
          min: -100,
          max: 100,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestValue(-60), -60);
      });
    });

    describe('Рассчет значений слайдера', () => {
      it('Вернуть массив значений от 0 до 10 с шагом 1', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
        };
        modelInstance = new SliderModel(modelProps);

        const expected: SliderModelValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        assert.deepEqual(modelInstance.calculateValues(), expected);
      });

      it('Вернуть массив значений от 0 до 5 с шагом 0.66', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 5,
          step: 0.66,
        };
        modelInstance = new SliderModel(modelProps);

        const expected: SliderModelValues = [0, 0.66, 1.32, 1.98, 2.64, 3.3, 3.96, 4.62, 5];

        assert.deepEqual(modelInstance.calculateValues(), expected);
      });

      it('Вернуть массив значений от -2 до 4.5 с шагом 0.75', () => {
        const modelProps: SliderProps = {
          min: -2,
          max: 4.5,
          step: 0.75,
        };
        modelInstance = new SliderModel(modelProps);

        const expected: SliderModelValues = [-2, -1.25, -0.5, 0.25, 1, 1.75, 2.5, 3.25, 4, 4.5];

        assert.deepEqual(modelInstance.calculateValues(), expected);
      });
    });

    describe('Получение индекса ближайшей точки', () => {
      it('Вернуть индекс точки ближайшей к 4', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestThumbIndex(4), 0);
      });

      it('Вернуть индекс точки ближайшей к 0', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestThumbIndex(4), 0);
      });

      it('Вернуть индекс точки ближайшей к 10', () => {
        const modelProps: SliderProps = {
          min: 0,
          max: 10,
          step: 1,
        };

        modelInstance = new SliderModel(modelProps);

        assert.equal(modelInstance.getClosestThumbIndex(4), 0);
      });
    });
  });
};

export default SliderModelTests;
