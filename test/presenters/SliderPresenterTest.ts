import { assert, expect } from 'chai';
import ISliderPresenter from '../../lib/interface/ISliderPresenter';
import SliderPresenter from '../../lib/js/presenters/SliderPresenter';

type Presenter = null | ISliderPresenter;

let presenter: Presenter = null;

const SliderPresenterTests = function () {
  describe('Тесты presenter\'а', () => {
    describe('Конвертирование DOM координат', () => {
      afterEach(() => {
        presenter?.destroy();
        presenter = null;
      });

      it('Преобразовать DOM координату 200 в значение слайдера 4', () => {
        const pos = 200;
        presenter = new SliderPresenter({
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 4);
      });

      it('Преобразовать DOM координату 300 в значение слайдера 6', () => {
        const pos = 300;
        presenter = new SliderPresenter({
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 6);
      });

      it('Преобразовать DOM координату 333 в значение слайдера 6.66', () => {
        const pos = 333;
        presenter = new SliderPresenter({
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 6.66);
      });

      it('Преобразовать DOM координату 333 в значение слайдера 13.32', () => {
        const pos = 333;
        presenter = new SliderPresenter({
          min: 0,
          max: 20,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 13.32);
      });

      it('Преобразовать DOM координату 500 в значение слайдера 37', () => {
        const pos = 500;
        presenter = new SliderPresenter({
          min: 0,
          max: 37,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 37);
      });
    });

    // describe('Получение индекса ближайшей точки', () => {
    //   afterEach(() => {
    //     presenter?.destroy();
    //     presenter = null;
    //   });

    //   it('Преобразовать DOM координату 200 в значение слайдера 4', () => {
    //     const pos = 200;
    //     presenter = new SliderPresenter({
    //       min: 0,
    //       max: 10,
    //       step: 2,
    //     });

    //     assert.equal(presenter.convertDOMPosToSliderValue(pos), 4);
    //   });
    // });
  });
};

export default SliderPresenterTests;
