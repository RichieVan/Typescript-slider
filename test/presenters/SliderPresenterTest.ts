import $ from 'jquery';
import { assert, expect } from 'chai';
import ISliderPresenter from '../../lib/interface/ISliderPresenter';
import SliderPresenter from '../../lib/js/presenters/SliderPresenter';

type Presenter = null | ISliderPresenter;

let presenter: Presenter = null;

const SliderPresenterTests = function () {
  describe('Тесты presenter\'а', () => {
    describe('Конвертирование DOM координат в значения слайдера', () => {
      afterEach(() => {
        if (presenter) {
          presenter.view.destroy();
          presenter = null;
        }
      });

      it('Преобразовать процентную DOM координату 40 в значение слайдера 4', () => {
        const pos = 40;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 4);
      });

      it('Преобразовать процентную DOM координату 60 в значение слайдера 6', () => {
        const pos = 60;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 6);
      });

      it('Преобразовать процентную DOM координату 66.6 в значение слайдера 6.66', () => {
        const pos = 66.6;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 6.66);
      });

      it('Преобразовать процентную DOM координату 66.6 в значение слайдера 13.32', () => {
        const pos = 66.6;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 20,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 13.32);
      });

      it('Преобразовать процентную DOM координату 100 в значение слайдера 37', () => {
        const pos = 100;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 37,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 37);
      });

      it('Преобразовать процентную DOM координату 20 в значение слайдера 70', () => {
        const pos = 20;
        presenter = new SliderPresenter($('body'), {
          min: 50,
          max: 150,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 70);
      });

      it('Преобразовать процентную DOM координату 40 в значение слайдера 900', () => {
        const pos = 40;
        presenter = new SliderPresenter($('body'), {
          min: 500,
          max: 1500,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 900);
      });

      it('Преобразовать процентную DOM координату 20 в значение слайдера -260', () => {
        const pos = 20;
        presenter = new SliderPresenter($('body'), {
          min: -500,
          max: 700,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), -260);
      });

      it('Преобразовать процентную DOM координату 50 в значение слайдера 100', () => {
        const pos = 50;
        presenter = new SliderPresenter($('body'), {
          min: -500,
          max: 700,
        });

        assert.equal(presenter.convertDOMPosToSliderValue(pos), 100);
      });
    });

    describe('Конвертирование значений слайдера в DOM координаты', () => {
      afterEach(() => {
        if (presenter) {
          presenter.view.destroy();
          presenter = null;
        }
      });

      it('Преобразовать значение слайдера 4 в процентную DOM координату 40', () => {
        const val = 4;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 40);
      });

      it('Преобразовать значение слайдера 6 в процентную DOM координату 60', () => {
        const val = 6;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 60);
      });

      it('Преобразовать значение слайдера 6.66 в процентную DOM координату 66.6', () => {
        const val = 6.66;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 10,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 66.6);
      });

      it('Преобразовать значение слайдера 13.32 в процентную DOM координату 66.6', () => {
        const val = 13.32;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 20,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 66.6);
      });

      it('Преобразовать значение слайдера 37 в процентную DOM координату 100', () => {
        const val = 37;
        presenter = new SliderPresenter($('body'), {
          min: 0,
          max: 37,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 100);
      });

      it('Преобразовать значение слайдера 70 в процентную DOM координату 20', () => {
        const val = 70;
        presenter = new SliderPresenter($('body'), {
          min: 50,
          max: 150,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 20);
      });

      it('Преобразовать значение слайдера 900 в процентную DOM координату 40', () => {
        const val = 900;
        presenter = new SliderPresenter($('body'), {
          min: 500,
          max: 1500,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 40);
      });

      it('Преобразовать значение слайдера -260 в процентную DOM координату 20', () => {
        const val = -260;
        presenter = new SliderPresenter($('body'), {
          min: -500,
          max: 700,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 20);
      });

      it('Преобразовать значение слайдера 100 в процентную DOM координату 50', () => {
        const val = 100;
        presenter = new SliderPresenter($('body'), {
          min: -500,
          max: 700,
        });

        assert.equal(presenter.convertSliderValueToDOMPos(val), 50);
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
