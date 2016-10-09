var helper = require('../helper');

helper.test({
expect:
`.background-vertical-gradient {
  background-image: vertical-gradient(rgb(255, 114, 77), 10%);
}`,
toBe:
`.background-vertical-gradient {
  background-image: linear-gradient("top, #ff9a80 0%, #ff4a1a 100%");
}`
});

helper.test({
expect:
`.background-image-theme {
  background-image: theme('image.svg');
}`,
toBe:
`.background-image-theme {
  background-image: url("production/img/theme/img/image.svg");
}`
});
