var helper = require('../helper');

helper.test({
expect:
`@include block(components-bem) {
  display: block;

  @include modifier('modifier') {
    background-color: rgb(150, 0, 255);
    @include element('element') {
      background-color: rgb(255, 153, 0);
    }
  }

  @include element('element') {
    background-color: rgb(0, 67, 255);

    @include modifier('modifier') {
      background-color: rgb(255, 67, 67);
    }
  }
}`,
toBe:
`.components-bem {
  display: block;
}

.components-bem--modifier {
  background-color: #9600ff;
}

.components-bem--modifier .components-bem__element {
  background-color: #ff9900;
}

.components-bem__element {
  background-color: #0043ff;
}

.components-bem__element--modifier {
  background-color: #ff4343;
}`
});

helper.test({
expect:
`@include block(block) {
  @include modifier('parent-modifier') {
    content: '.block--parent-modifier';
  }

  &:hover{
    @include element('element') {
      content: '.block:hover .block__element';
      @include modifier('modifier') {
        content: '.block:hover .block__element--modifier';
      }
    }
  }

  @include element('element') {
    content: '.block__element';
    @include modifier('child-modifier') {
      content: '.block__element--child-modifier';
    }
    &:hover {
      @include element('element-child') {
        content: '.block__element:hover .block__element-child';
        @include modifier('modifier') {
          content: '.block__element:hover .block__element-child--modifier';
        }
      }
      @include modifier('modifier') {
        content: '.block__element:hover.block__element--modifier';
      }
    }
  }
}`,
toBe:
`.block--parent-modifier {
  content: '.block--parent-modifier';
}

.block:hover .block__element {
  content: '.block:hover .block__element';
}

.block:hover .block__element--modifier {
  content: '.block:hover .block__element--modifier';
}

.block__element {
  content: '.block__element';
}

.block__element--child-modifier {
  content: '.block__element--child-modifier';
}

.block__element:hover .block__element-child {
  content: '.block__element:hover .block__element-child';
}

.block__element:hover .block__element-child--modifier {
  content: '.block__element:hover .block__element-child--modifier';
}

.block__element:hover.block__element--modifier {
  content: '.block__element:hover.block__element--modifier';
}
`
});
