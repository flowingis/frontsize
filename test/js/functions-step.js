var helper = require('../helper');

helper.test({
expect:
`.functions-step {
  width: step(4);
}`,
toBe:
`.functions-step {
  width: 33.33333%;
}`
});

helper.test({
expect:
`.functions-step-2 {
  width: step(4, 10);
}`,
toBe:
`.functions-step-2 {
  width: 40%;
}`
});
