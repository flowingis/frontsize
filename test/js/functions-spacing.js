var helper = require('../helper');

helper.test({
expect:
`$spacing: 20px;
.functions-spacing {
  $multiplier: 2;
  width: spacing(2);
  height: spacing(2);
}`,
toBe:
`.functions-spacing {
  width: 40px;
  height: 40px;
}`
});

helper.test({
expect:
`$spacing: 20px;
.functions-spacing-2 {
  $multiplier: 0.5;
  width: spacing(0.5);
  height: spacing(0.5);
}`,
toBe:
`.functions-spacing-2 {
  width: 10px;
  height: 10px;
}`
});
