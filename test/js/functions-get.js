var helper = require('../helper');

helper.test({
expect:
`@function message($element) {
  @return get((
    'info': #449cdd,
    'error': #f44c3d,
    'warning': #fcdd44,
    'success': #44dc8d
  ), $element);
}
.functions-get {
  background-color: message('success');
}`,
toBe:
`.functions-get {
  background-color: #44dc8d;
}`
});
