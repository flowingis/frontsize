---
collection: bem
date: 2018-05-09T11:10
title: element
view: example.twig
---

## Element mixin

It should be used inside [block][block] mixin that works as wrapper and check if `element` is used without exceed the nesting limit that BEM methodology helps you to maintain.

```scss
@include block ('button') {
  background: #3c4;
  display: inline-block;
  padding: 4px 8px;

  @include element ('text') {
    color: #fff;
    font-size: 12px;
  }

  @include element ('item') {
    &:hover {
      @include element ('sub-item') {
        color: #f3d;
      }
    }
    @include modifier ('modified') {
      @include element ('sub-item') {
        color: #faa;
      }
    }
  }
}
```

The mixin `element` needs to be wrapped inside [block][block], an also used inside [modifier][modifier] or a pseudo class selector as `:hover`, `:focus` etc.

```css
.button {
  background: #3c4;
  display: inline-block;
  padding: 4px 8px;
}
.button__text {
  color: #fff;
  font-size: 12px;
}
.button__item:hover .button__sub-item {
  color: #f3d;
}
.button__item--modified .button__sub-item {
  color: #faa;
}
```

Using and `element` directly inside another `element` will throw an error because there is no reason to nest them and create additional selector nesting.

[block]: ./block.html
[modifier]: ./modifier.html
