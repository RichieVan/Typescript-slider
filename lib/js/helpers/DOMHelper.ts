import $ from 'jquery';

class DOMHelper {
  public static createSliderElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider',
    });
    return element;
  }

  public static createControlsElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__controls',
    });
    return element;
  }

  public static createWrapperElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__wrapper',
    });
    return element;
  }

  public static createRangeElement(): JQuery<HTMLElement>[] {
    const wrapper = $('<div/>', {
      class: 'slider__range-wrapper',
    });

    const inner = $('<div/>', {
      class: 'slider__range-inner',
    });

    const range = $('<div/>', {
      class: 'slider__range',
    });

    const progress = $('<div/>', {
      class: 'slider__progress',
    });

    inner.append([range, progress]);
    wrapper.append(inner);
    return [wrapper, range, progress];
  }

  public static createDotElement(): JQuery<HTMLElement>[] {
    const element = $('<div/>', {
      class: 'slider__dot',
    });

    const wrapper = $('<div/>', {
      class: 'slider__dot-wrapper',
    });

    element.append(wrapper);

    return [element, wrapper];
  }

  public static createDotContentElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__dot-content',
    });
    return element;
  }

  public static createDotMarkElement(): JQuery<HTMLElement>[] {
    const element = $('<div/>', {
      class: 'slider__dot-mark',
    });

    const value = $('<div/>', {
      class: 'slider__dot-value',
    });

    const marker = $('<div/>', {
      class: 'slider__dot-marker',
    });

    element.append(value, marker);

    return [element, value];
  }

  public static createDivisionsContainerElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__divisions',
    });
    return element;
  }

  public static createDivisionElement(val: number): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__division',
    });

    const marker = $('<div/>', {
      class: 'slider__division-marker',
    });

    const value = $('<div/>', {
      class: 'slider__division-value',
      html: String(val),
    });

    element.append([value, marker]);
    return element;
  }

  public static getProgressBarEmptyClass(): string {
    return 'slider__progress_empty';
  }

  public static getProgressBarFullClass(): string {
    return 'slider__progress_full';
  }

  public static getDotActiveClass(): string {
    return 'slider__dot_active';
  }

  public static getDotViewMouseUpEventClass(): string {
    return 'slider_moving_to_valid';
  }

  public static getEnabledDotMarksModifierClass(): string {
    return 'slider_with_dot-mark';
  }
}

export default DOMHelper;
