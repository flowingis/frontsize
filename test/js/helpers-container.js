var helper = require('../helper');

helper.test({
expect:
`.helpers-container {
  @include limit((
    '>=desktop-small': 1280px,
    '<=tablet-large': 1280px
  ));
}`,
toBe:
`.helpers-container {
  margin: auto;
}

@media (min-width: 1280px) {
  .helpers-container {
    max-width: 1280px;
  }
}

@media (max-width: 1024px) {
  .helpers-container {
    max-width: 1280px;
  }
}`
});
