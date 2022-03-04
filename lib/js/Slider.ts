import $ from 'jquery';
import SliderProps from '../type/SliderProps';
import SliderPresenter from './presenters/SliderPresenter';

$.fn.rvSlider = function (this: JQuery, data: SliderProps): JQuery {
  this.each(function () {
    const slider = new SliderPresenter($(this), data);
  });
  return this;
};
