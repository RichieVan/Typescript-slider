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

  public static createRangeElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__range',
    });
    return element;
  }

  public static createDotElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__dot',
    });
    return element;
  }

  public static createDotContentElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__dot-content',
    });
    return element;
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
}

export default DOMHelper;
