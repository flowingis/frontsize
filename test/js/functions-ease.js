var helper = require('../helper');

helper.test({
expect:
`.functions-ease {
  transition: color 0.5s ease('in-quad');
  transition: color 0.5s ease('in-cubic');
  transition: color 0.5s ease('in-quart');
  transition: color 0.5s ease('in-quint');
  transition: color 0.5s ease('in-sine');
  transition: color 0.5s ease('in-expo');
  transition: color 0.5s ease('in-circ');
  transition: color 0.5s ease('in-back');
  transition: color 0.5s ease('out-quad');
  transition: color 0.5s ease('out-cubic');
  transition: color 0.5s ease('out-quart');
  transition: color 0.5s ease('out-quint');
  transition: color 0.5s ease('out-sine');
  transition: color 0.5s ease('out-expo');
  transition: color 0.5s ease('out-circ');
  transition: color 0.5s ease('out-back');
  transition: color 0.5s ease('in-out-quad');
  transition: color 0.5s ease('in-out-cubic');
  transition: color 0.5s ease('in-out-quart');
  transition: color 0.5s ease('in-out-quint');
  transition: color 0.5s ease('in-out-sine');
  transition: color 0.5s ease('in-out-expo');
  transition: color 0.5s ease('in-out-circ');
  transition: color 0.5s ease('in-out-back');
}`,
toBe:
`.functions-ease {
  transition: color 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transition: color 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  transition: color 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  transition: color 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);
  transition: color 0.5s cubic-bezier(0.47, 0, 0.745, 0.715);
  transition: color 0.5s cubic-bezier(0.95, 0.05, 0.795, 0.035);
  transition: color 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  transition: color 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  transition: color 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition: color 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: color 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transition: color 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
  transition: color 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  transition: color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: color 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: color 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  transition: color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  transition: color 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  transition: color 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: color 0.5s cubic-bezier(1, 0, 0, 1);
  transition: color 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition: color 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`
});
