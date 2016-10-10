var helper = require('../helper');

helper.test({
expect:
`.helpers-icon {
  @include icon('file.svg', 32px) {
    background-color: red;
  }
}`,
toBe:
`.helpers-icon {
  background-image: url("production/img/theme/img/file.svg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 32px;
  width: 32px;
  background-color: red;
}`
});
