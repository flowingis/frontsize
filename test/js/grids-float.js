var helper = require('../helper');

helper.test({
expect:
`.row {
  @include float-row((
      '<=desktop-large': 6,
      '<=tablet-large': 4,
      '<=phone-large': 2
  ), 12);
}`,
toBe:
`.row {
  clear: both;
  display: block;
  width: auto;
}
.row::after {
  clear: both;
  content: '';
  display: block;
  float: left;
  height: 1px;
  margin-top: -1px;
  width: 100%;
}

.row__column {
  display: block;
  float: left;
}

@media (max-width: 1800px) {
  .row__column {
    width: 50%;
  }
}

@media (max-width: 1024px) {
  .row__column {
    width: 33.33333%;
  }
}

@media (max-width: 480px) {
  .row__column {
    width: 16.66667%;
  }
}`
});
