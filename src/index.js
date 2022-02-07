import './plugin/scss/style.scss';

import Slider from './plugin/class/Slider';

const slider = new Slider({
  min: 0,
  max: 10,
  current: 5,
});
slider.render();
