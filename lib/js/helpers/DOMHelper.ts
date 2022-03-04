import $ from 'jquery';

class DOMHelper {
  public static createSliderElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'rv-slider',
    });
    return element;
  }

  public static createControlsElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'rv-slider__controls',
    });
    return element;
  }

  public static createWrapperElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'rv-slider__wrapper',
    });
    return element;
  }

  public static createRangeElement(): JQuery<HTMLElement>[] {
    const wrapper = $('<div/>', {
      class: 'rv-slider__range-wrapper',
    });

    const inner = $('<div/>', {
      class: 'rv-slider__range-inner',
    });

    const range = $('<div/>', {
      class: 'rv-slider__range',
    });

    const progress = $('<div/>', {
      class: 'rv-slider__progress',
    });

    inner.append([range, progress]);
    wrapper.append(inner);
    return [wrapper, range, progress];
  }

  public static createThumbElement(): JQuery<HTMLElement>[] {
    const element = $('<div/>', {
      class: 'rv-slider__thumb',
    });

    const wrapper = $('<div/>', {
      class: 'rv-slider__thumb-wrapper',
    });

    element.append(wrapper);

    return [element, wrapper];
  }

  public static createThumbContentElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'rv-slider__thumb-content',
    });
    return element;
  }

  public static createThumbMarkElement(): JQuery<HTMLElement>[] {
    const element = $('<div/>', {
      class: 'rv-slider__thumb-mark',
    });

    const value = $('<div/>', {
      class: 'rv-slider__thumb-value',
    });

    const marker = $('<div/>', {
      class: 'rv-slider__thumb-marker',
    });

    element.append(value, marker);

    return [element, value];
  }

  public static createDivisionsContainerElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'rv-slider__divisions',
    });

    return element;
  }

  public static createDivisionElement(val: number): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'rv-slider__division',
    });

    const wrapper = $('<div/>', {
      class: 'rv-slider__division-wrapper',
    });

    element.append(wrapper);

    const marker = $('<div/>', {
      class: 'rv-slider__division-marker',
    });

    const value = $('<div/>', {
      class: 'rv-slider__division-value',
      html: String(val),
    });

    element.append(wrapper);
    wrapper.append(value, marker);
    return element;
  }

  public static getProgressBarEmptyClass(): string {
    return 'rv-slider__progress_empty';
  }

  public static getProgressBarFullClass(): string {
    return 'rv-slider__progress_full';
  }

  public static getThumbActiveClass(): string {
    return 'rv-slider__thumb_active';
  }

  public static getThumbViewMouseUpEventClass(): string {
    return 'rv-slider_moving_to_valid';
  }

  public static getEnabledThumbMarksModifierClass(): string {
    return 'rv-slider_with_thumb-mark';
  }
}

export default DOMHelper;
