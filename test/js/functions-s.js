var helper = require('../helper');

helper.test({
expect:
`$spacing: 20px;
.functions-s {
  min-width: s();
  width: s(2, 32px);
  min-height: s(0.5);
  height: s(0.5, 24px);
}`,
toBe:
`.functions-s {
  min-width: 20px;
  width: 64px;
  min-height: 10px;
  height: 12px;
}`
});
