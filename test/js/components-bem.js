var test = require('../helper').test;

test(
`.components-bem {
  display: block;
}`
);

test(
`.components-bem__element {
  background-color: #0043ff;
}`
);

test(
`.components-bem__element--modifier {
  background-color: #ff4343;
}`
);
