import $ from 'jquery';
import Panel from '../../panel/Panel';
import SliderProps from '../type/SliderProps';
import SliderPresenter from './presenters/SliderPresenter';

$.fn.rvSlider = function (this: JQuery, data: SliderProps, panel?: JQuery<HTMLElement>): JQuery {
  this.each(function () {
    const slider = new SliderPresenter($(this), data);
    if (panel) {
      const sliderPanel = new Panel(
        panel,
        slider,
        $(this),
      );
    }
  });
  return this;
};
