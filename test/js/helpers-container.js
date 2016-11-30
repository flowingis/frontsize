var helper = require('../helper');

helper.test({
expect:
`.helpers-container-child {
  @include has-parent('parent-element') {
    content: 'case 1';
  }
  @include has-parent('.parent-element') {
    content: 'case 2';
  }
  @include has-parent('#parent-element') {
    content: 'case 3';
  }
}`,
toBe:
`
.parent-element .helpers-container-child {
  content: 'case 1';
}

.parent-element .helpers-container-child {
  content: 'case 2';
}

#parent-element .helpers-container-child {
  content: 'case 3';
}`
});

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
