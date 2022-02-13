import SliderPresenter from '../lib/js/presenters/SliderPresenter';

import '../lib/scss/style.scss';

const slider = new SliderPresenter({
  min: 0,
  max: 10,
  step: 1.5,
  // current: 5,
});
