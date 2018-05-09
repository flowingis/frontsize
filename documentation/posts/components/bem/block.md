---
collection: bem
date: 2018-05-09T11:10
title: block
view: example.twig
---

## BEM

This component uses vars to define how you want to handle BEM syntax convention:

| Var | Default value | Related file | Description |
|-|-|-|-|
| `$bem-element` | `__` | [bem.scss][bem] | The BEM element convention prefix. |
| `$bem-modifier` | `--` | [bem.scss][bem] | The BEM modifier convention prefix. |

### Block mixin

This `block` is designed to work with [element][element] and [modifier][modifier] mixins to prevent deep selector nesting.

```scss
@include block ('button') {
  background: #3f6c44;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  padding: 4px 8px;
}
```

This mixin uses the block name parameter as the block selector class name and prevents [element][element] and [modifier][modifier] mixins to be used in the wrong way.

```css
.button {
  background: #3f6c44;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  padding: 4px 8px;
}
```

[bem]: https://github.com/ideatosrl/frontsize/blob/master/core/components/bem.scss
[element]: ./element.html
[modifier]: ./modifier.html
