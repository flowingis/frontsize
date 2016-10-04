var test = require('../helper').test;

test(
`.background-vertical-gradient {
  background-image: linear-gradient("top, #ff9a80 0%, #ff4a1a 100%");
}`
);

test(
`.background-image-theme {
  background-image: url("production/img/theme/img/image.svg");
}`
);
