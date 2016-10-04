var test = require('../helper').test;

test(
`@font-face {
  font-family: 'Pipiloca';
  font-weight: 400;
  src: url("production/img/theme/fonts/LatoRegular.ttf") format("truetype");
}`
);

test(
`@font-face {
  font-family: 'Pipiloca';
  font-weight: 700;
  src: url("production/img/theme/fonts/LatoBold.eot") format("embedded-opentype");
}`
);

test(
`@font-face {
  font-family: 'other font';
  font-weight: 300;
  src: url("production/img/theme/fonts/other-font.eot") format("embedded-opentype"), url("production/img/theme/fonts/other-font.ttf") format("truetype"), url("production/img/theme/fonts/other-font.woff") format(woff), url("production/img/theme/fonts/other-font.woff2") format(woff2);
}`
);
