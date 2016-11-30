var helper = require('../helper');

helper.test({
expect:
`.helpers-debug {
  @include debug;
}`,
toBe:
`.helpers-debug {
  animation: f-debug-highlight 4s infinite;
  box-shadow: inset 0 0 0 1px rgba(255, 0, 255, 0.3);
  min-height: 3px;
}

@keyframes f-debug-highlight {
  0% {
    box-shadow: inset 0 0 0 1px rgba(255, 0, 255, 0.3);
  }
  50% {
    box-shadow: inset 0 0 0 1px rgba(255, 0, 255, 0.6);
  }
  100% {
    box-shadow: inset 0 0 0 1px rgba(255, 0, 255, 0.3);
  }
}

.helpers-debug * {
  animation: f-debug-highlight 4s infinite;
  box-shadow: inset 0 0 0 1px rgba(255, 0, 255, 0.3);
  min-height: 3px;
}`
});

helper.test({
expect:
`
$debug-duration: 2s;
$debug-color-off: #fff;
$debug-color-on: #000;

.helpers-debug {
  @include debug;
}`,
toBe:
`.helpers-debug {
  animation: f-debug-highlight 2s infinite;
  box-shadow: inset 0 0 0 1px #fff;
  min-height: 3px;
}

@keyframes f-debug-highlight {
  0% {
    box-shadow: inset 0 0 0 1px #fff;
  }
  50% {
    box-shadow: inset 0 0 0 1px #000;
  }
  100% {
    box-shadow: inset 0 0 0 1px #fff;
  }
}

.helpers-debug * {
  animation: f-debug-highlight 2s infinite;
  box-shadow: inset 0 0 0 1px #fff;
  min-height: 3px;
}`
});
