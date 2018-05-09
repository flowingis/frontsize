---
collection: bem
date: 2018-05-09T11:10
title: modifier
view: example.twig
---

## Modifier mixin

It should be used inside [block][block] mixin that works as wrapper and check if `modifier` is used inside it or inside [element][element].

```scss
@include block ('button') {
  background: #ccc;
  color: #000;
  display: inline-block;
  padding: 4px 8px;

  @include modifier ('error') {
    background: #f02052;

    @include element ('text') {
      color: #fff;
    }
  }

  @include element ('text') {
    font-size: 12px;

    @include modifier ('action') {
      font-weight: 700;
    }
  }
}
```

The mixin `element` needs to be wrapped inside [block][block], an also used inside [modifier][modifier] or a pseudo class selector as `:hover`, `:focus` etc.

```css
.button {
  background: #ccc;
  color: #000;
  display: inline-block;
  padding: 4px 8px;
}
.button--error {
  background: #f02052;
}
.button--error .button__text {
  color: #fff;
}
.button__text {
  font-size: 12px;
}
.button__text--action {
  font-weight: 700;
}
```

Using and `element` directly inside another `element` will throw an error because there is no reason to nest them and create additional selector nesting.

[block]: ./block.html
[element]: ./element.html
[modifier]: ./modifier.html
