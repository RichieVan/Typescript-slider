import $ from 'jquery';

import '../lib/js/Slider';

import './styles/style.scss';
import '../lib/scss/style.scss';

$('.slider-container#slider1').rvSlider(
  {
    min: -500,
    max: 500,
    step: 50,
    smooth: true,
    showMarks: true,
  },
  $('#sliderPanel1'),
);

$('.slider-container#slider2').rvSlider(
  {
    min: -1,
    max: 2,
    step: 0.1,
    thumbsValues: [1.5],
    showThumbValue: true,
    showMarks: true,
  },
  $('#sliderPanel2'),
);

$('.slider-container#slider3').rvSlider(
  {
    min: -500,
    max: 500,
    step: 250,
    thumbsValues: [250],
    smooth: true,
    showThumbValue: true,
    showMinAndMax: true,
  },
  $('#sliderPanel3'),
);

$('.slider-container#slider4').rvSlider(
  {
    min: 0,
    max: 10,
    step: 1,
    smooth: true,
    range: true,
    thumbsValues: [1, 4],
    showThumbValue: true,
    showMinAndMax: true,
    showMarks: true,
  },
  $('#sliderPanel4'),
);

$('.slider-container#slider5').rvSlider(
  {
    min: 0,
    max: 17,
    step: 3,
    range: true,
    thumbsValues: [3, 15],
    showThumbValue: true,
    showMinAndMax: true,
    showMarks: true,
  },
  $('#sliderPanel5'),
);

$('.slider-container#slider6').rvSlider(
  {
    min: 0,
    max: 5,
    step: 1.24,
    showMarks: true,
    smooth: true,
    showThumbValue: true,
  },
  $('#sliderPanel6'),
);

$('.slider-container#slider7').rvSlider(
  {
    min: 0,
    max: 10,
    step: 1.24,
    smooth: true,
    range: true,
    thumbsValues: [1.24, 4.96],
    showThumbValue: true,
    showMinAndMax: true,
    showMarks: true,
    vertical: true,
  },
  $('#sliderPanel7'),
);
