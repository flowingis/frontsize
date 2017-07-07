var helper = require('../helper');

helper.test({
expect:
`.background-vertical-gradient {
  background-image: vertical-gradient(rgb(255, 114, 77), 10%);
}`,
toBe:
`.background-vertical-gradient {
  background-image: linear-gradient(to bottom, #ff9a80, #ff4a1a);
}`
});

helper.test({
expect:
`.background-vertical-gradient {
  background-image: vertical-gradient(#ff724d, #33f2fd);
}`,
toBe:
`.background-vertical-gradient {
  background-image: linear-gradient(to bottom, #ff724d, #33f2fd);
}`
});

helper.test({
expect:
`$path-images: 'path/to/images/';
$invalidate-cache: false;
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
$invalidate-cache: false;
.background-image-theme {
  background-image: theme('image.svg', 'http://cdn.images.com/');
}`,
toBe:
`.background-image-theme {
  background-image: url("http://cdn.images.com/image.svg");
}`
});

helper.test({
expect:
`$path-images: 'path/to/images/';
$invalidate-cache: true;
.background-image-theme {
  background-image: theme('image.svg', 'http://cdn.images.com/', 's7Uer66d0ssd4F4');
}`,
toBe:
`.background-image-theme {
  background-image: url("http://cdn.images.com/image.svg?s7Uer66d0ssd4F4");
}`
});
