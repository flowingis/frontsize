var test = require('../helper').test;

test(
`.sprite-selector {
  background-repeat: no-repeat;
  background-size: 32px 60px;
  height: 30px;
  width: 32px;
  background-image: url("production/img/theme/img/sprite-image.svg");
}`
);

test(
`.sprite-selector--open {
  background-position: 0 0;
}`
);

test(
`.sprite-selector--close {
  background-position: 0 -30px;
}`
);
