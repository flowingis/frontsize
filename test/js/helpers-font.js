var helper = require('../helper');

helper.test({
expect:
`@include font('LatoRegular', (ttf)) {
  font-family: 'Pipiloca';
  font-weight: 400;
}`,
toBe:
`@font-face {
  font-family: 'Pipiloca';
  font-weight: 400;
  src: url("production/img/theme/fonts/LatoRegular.ttf") format("truetype");
}`
});

helper.test({
expect:
`@include font('LatoBold', (eot)) {
  font-family: 'Pipiloca';
  font-weight: 700;
}`,
toBe:
`@font-face {
  font-family: 'Pipiloca';
  font-weight: 700;
  src: url("production/img/theme/fonts/LatoBold.eot") format("embedded-opentype");
}`
});

helper.test({
expect:
`@include font('other-font', (eot, ttf, woff, woff2)) {
  font-family: 'other font';
  font-weight: 300;
}`,
toBe:
`@font-face {
  font-family: 'other font';
  font-weight: 300;
  src: url("production/img/theme/fonts/other-font.eot") format("embedded-opentype"), url("production/img/theme/fonts/other-font.ttf") format("truetype"), url("production/img/theme/fonts/other-font.woff") format(woff), url("production/img/theme/fonts/other-font.woff2") format(woff2);
}`
});
