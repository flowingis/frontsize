var helper = require('../helper');

helper.test({
expect:
`.components-bem {
  display: block;

  @include element('element') {
    background-color: rgb(0, 67, 255);

    @include modifier('modifier') {
      background-color: rgb(255, 67, 67);
    }
  }
}`,
toBe:
`.components-bem {
  display: block;
}

.components-bem__element {
  background-color: #0043ff;
}

.components-bem__element--modifier {
  background-color: #ff4343;
}`
});
