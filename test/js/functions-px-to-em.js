var helper = require('../helper');

helper.test({
expect:
`.functions-px-to-em {
  font-size: px-to-em(18px);
}`,
toBe:
`.functions-px-to-em {
  font-size: 1.125em;
}`
});

helper.test({
expect:
`.functions-px-to-em-2 {
  font-size: px-to-em(12px);
}`,
toBe:
`.functions-px-to-em-2 {
  font-size: 0.75em;
}`
});
