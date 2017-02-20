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
`.background-vertical-gradient {
  background-image: vertical-gradient(#ff724d, #33f2fd);
}`,
toBe:
`.background-vertical-gradient {
  background-image: linear-gradient("top, #ff724d 0%, #33f2fd 100%");
}`
});

helper.test({
expect:
`$path-images: 'path/to/images/';
.background-image-theme {
  background-image: theme('image.svg');
}`,
toBe:
`.background-image-theme {
  background-image: url("path/to/images/image.svg");
}`
});

helper.test({
expect:
`$path-images: 'path/to/images/';
.background-image-theme {
  background-image: theme('image.svg', 'http://cdn.images.com/');
}`,
toBe:
`.background-image-theme {
  background-image: url("http://cdn.images.com/image.svg");
}`
});
