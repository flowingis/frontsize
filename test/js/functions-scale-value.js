var helper = require('../helper');

helper.test({
expect:
`.functions-scale-value {
  $multiplier: 2;
  width: scale-value(32px, $multiplier);
  height: scale-value(32px, $multiplier);
}`,
toBe:
`.functions-scale-value {
  width: 64px;
  height: 64px;
}`
});

helper.test({
expect:
`.functions-scale-value-2 {
  $multiplier: 0.5;
  width: scale-value(32px, $multiplier);
  height: scale-value(32px, $multiplier);
}`,
toBe:
`.functions-scale-value-2 {
  width: 16px;
  height: 16px;
}`
});
