import $ from 'jquery';

import ISliderPresenter from '../lib/interface/ISliderPresenter';
import { ChangeCallbackProps } from '../lib/type/types';

class Panel {
  constructor(
    private container: JQuery<HTMLElement>,
    private slider: ISliderPresenter,
    private sliderContainer: JQuery<HTMLElement>,
  ) {
    this.render();
  }

  render() {
    const keysExceptions = ['values', 'onChange'];
    const thumbFromInput = this.createThumbInputElement();
    const thumbToInput = this.createThumbInputElement();

    this.slider.model.setOnChangeCallback(({ values }: ChangeCallbackProps): void => {
      thumbFromInput.val(values[0]);
      if (values.length > 1) thumbToInput.val(values[1]);
    });

    Object.entries(this.slider.model).forEach((entry) => {
      const [key, value] = entry;
      let additionalClasses = '';
      const label = $('<label/>', {
        class: 'panel-field__label',
      });
      if (!keysExceptions.includes(key)) {
        if (key === 'min') {
          const input = $('<input/>', {
            class: 'panel-field__input',
            type: 'number',
            value,
          });
          input.on('input', (e: JQuery.TriggeredEvent) => {
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;

            this.slider.setMin(Number(inputTarget.value));
            thumbFromInput.prop('min', inputTarget.value);
            thumbToInput.prop('min', inputTarget.value);
          });
          label.append(input);
        } else if (key === 'max') {
          const input = $('<input/>', {
            class: 'panel-field__input',
            type: 'number',
            value,
          });
          input.on('input', (e: JQuery.TriggeredEvent) => {
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;

            this.slider.setMax(Number(inputTarget.value));
            thumbFromInput.prop('max', inputTarget.value);
            thumbToInput.prop('max', inputTarget.value);
          });
          label.append(input);
        } else if (key === 'step') {
          const input = $('<input/>', {
            class: 'panel-field__input',
            type: 'number',
            value,
            min: 0,
            max: this.slider.model.getMax() - this.slider.model.getMin(),
          });
          input.on('input', (e) => {
            const maxStep = this.slider.model.getMax() - this.slider.model.getMin();
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;

            if (parseInt(inputTarget.value, 10) > maxStep) {
              inputTarget.value = maxStep.toString();
            }

            this.slider.setStep(Number(inputTarget.value));
            thumbFromInput.prop('step', inputTarget.value);
            thumbToInput.prop('step', inputTarget.value);
          });
          label.append(input);
        } else if (key === 'thumbsValues') {
          thumbFromInput.val(value[0]);
          thumbFromInput.on('input', (e) => {
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;
            let targetValue = Number(inputTarget.value);
            let thumbsValues: number[] = [];
            thumbsValues = thumbsValues.concat(this.slider.model.getThumbsValues());

            const lowerThanMin = targetValue < this.slider.model.getMin();
            const higherThanMax = targetValue > this.slider.model.getMax();

            if (lowerThanMin) targetValue = this.slider.model.getMin();
            if (higherThanMax) targetValue = this.slider.model.getMax();
            if (thumbsValues.length > 1) {
              if (targetValue > thumbsValues[1]) {
                targetValue = thumbsValues[1];
              }
            }

            targetValue = this.slider.model.getClosestValue(targetValue);
            inputTarget.value = String(targetValue);
            thumbsValues[0] = targetValue;
            this.slider.setThumbs(thumbsValues);
          });
          label.append(thumbFromInput);

          thumbToInput.val(value[1] || this.slider.model.getMax());
          thumbToInput.on('input', (e) => {
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;
            let targetValue = Number(inputTarget.value);
            let thumbsValues: number[] = [];
            thumbsValues = thumbsValues.concat(this.slider.model.getThumbsValues());

            const lowerThanMin = targetValue < this.slider.model.getMin();
            const higherThanMax = targetValue > this.slider.model.getMax();

            if (lowerThanMin) targetValue = this.slider.model.getMin();
            if (higherThanMax) targetValue = this.slider.model.getMax();
            if (thumbsValues.length > 1) {
              if (targetValue < thumbsValues[0]) {
                targetValue = thumbsValues[0];
              }
            }

            targetValue = this.slider.model.getClosestValue(targetValue);
            inputTarget.value = String(targetValue);
            thumbsValues[1] = targetValue;
            this.slider.setThumbs(thumbsValues);
          });
          label.append(thumbToInput);
        } else if (key === 'range') {
          const input = this.createCheckboxElement(value);
          additionalClasses += 'panel-field_checkbox';
          input.on('change', (e: JQuery.ChangeEvent) => {
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;
            const isChecked = inputTarget.checked;
            this.slider.setToggableProp(key, isChecked);
            if (isChecked) {
              thumbToInput.val(this.slider.model.getMax());
              thumbToInput.show();
            } else thumbToInput.hide();
          });

          if (input.prop('checked')) thumbToInput.show();
          else thumbToInput.hide();

          label.append(input);
        } else if (key === 'vertical') {
          const input = this.createCheckboxElement(value);
          additionalClasses += 'panel-field_checkbox';
          input.on('change', (e: JQuery.ChangeEvent) => {
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;
            const isChecked = inputTarget.checked;
            if (isChecked) {
              this.container.addClass('panel_vertical');
              this.sliderContainer.css({ height: '500px' });
            } else {
              this.container.removeClass('panel_vertical');
              this.sliderContainer.css({ height: '' });
            }
            this.slider.setToggableProp(key, isChecked);
          });

          if (input.prop('checked')) {
            this.container.addClass('panel_vertical');
            this.sliderContainer.css({ height: '500px' });
          } else {
            this.container.removeClass('panel_vertical');
            this.sliderContainer.css({ height: '' });
          }
          this.slider.updateView();

          label.append(input);
        } else if (
          key === 'smooth'
          || key === 'showThumbValue'
          || key === 'showMarks'
          || key === 'showMinAndMax'
        ) {
          const input = this.createCheckboxElement(value);
          additionalClasses += 'panel-field_checkbox';
          input.on('change', (e: JQuery.ChangeEvent) => {
            const inputTarget: HTMLInputElement = <HTMLInputElement>e.target;
            this.slider.setToggableProp(key, inputTarget.checked);
          });
          label.append(input);
        }

        const element = $('<div/>', {
          class: `panel-field ${additionalClasses}`,
        });
        label.append(`<span>${key}: </span>`);
        element.append(label);
        this.container.append(element);
      }
    });
  }

  createThumbInputElement(): JQuery<HTMLElement> {
    const element = $('<input/>', {
      class: 'panel-field__input',
      type: 'number',
      min: this.slider.model.getMin(),
      max: this.slider.model.getMax(),
      step: this.slider.model.getStep(),
    });

    return element;
  }

  createCheckboxElement(checked: boolean): JQuery<HTMLElement> {
    const element = $('<input/>', {
      class: 'panel-field__input',
      type: 'checkbox',
      checked,
    });

    return element;
  }
}

export default Panel;
