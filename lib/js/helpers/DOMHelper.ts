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

  public static createDivisionsElement(): JQuery<HTMLElement> {
    const element = $('<div/>', {
      class: 'slider__divisions',
    });
    return element;
  }
}

export default DOMHelper;
