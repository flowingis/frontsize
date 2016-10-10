var helper = require('../helper');

helper.test({
expect:
`.sprite-selector {
  @include sprite(1 2, 32px 32px) {
    background-image: theme('sprite-image.svg');
    @include sprite-modifier('open', 1 1);
    @include sprite-modifier('close', 1 2);
  }
}`,
toBe:
`.sprite-selector {
  background-repeat: no-repeat;
  background-size: 32px 64px;
  height: 32px;
  width: 32px;
  background-image: url("production/img/theme/img/sprite-image.svg");
}

.sprite-selector--open {
  background-position: 0 0;
}

.sprite-selector--close {
  background-position: 0 -32px;
}`
});
