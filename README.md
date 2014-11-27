Frontsize 2.0.0
=========

It's a CSS generator front-end framework written to make websites easy to read on every device and faster to be coded. It gives to the developer a solid base which can be used to build responsive layouts for websites or web apps.

###Why frontsize?

- It passes [CSSlint][csslint] tests (see the tests [configuration][csslintc])
- It can be useful for [migrations][migration] by it's high customizable features
- It's totally [customizable][app]

If you'd like to see more features, visit [frontsize.com][site] website.

Do you prefer a [LESS][less] version?

Documentation is [in progress][docs] and *far to be completed* but the best doc is the code itself, isn't it?


Next release details
---

**Features**
- **added** `spritePosition` now get `sprite` size properties automatically without the need to pass them manually
- **added** missing `column-fill` CSS3 prefixes
- **added** `flex` CSS3 prefixes
- **added** `grid` CSS3 prefixes
- **added** new grid system `addFlexGridContainer` and `addFlexGridColumns`
- **added** new grid system for texts `addTextColumnGrid` and `addTextColumnGrid` which can emulate also [Pinterest](http://pinterest.com) boards
- **added** `tone` mixin to tone colors easily
- **added** `viewport-height` state selector
- **added** `fonts` folders and added app var `@path-font`
- **added** selective `viewport-clear` rule for every viewport group

**Fixes**
- **optimized** tons of core code
- **fixed** missing default `font-size` for headings
- **fixed** padding rule names with new naming convention
- **fixed** missing default `font-weight` and `font-size` on base body
- **moved** `spriteRetina` mixin to a new file `sprite-retina.scss` like with `background-retina.scss` and background retina mixins
- **replaced** filenames `_` with `-` for more file naming consistance
- **optimized** `asTable` mixin now can skip `width` property

**Changes**
- **renamed** float grid system mixins with more clear names
- **moved** grid mixins to `grids` core folder
- **changed** `.map` files now are based on CSS names automatically
- **changed** `addFontRule` mixin now is more easy to use
- **changed** float grid private mixins naming convention to be more easy to be recognized
- **optimized** background retina mixins, removed useless duplicate code now works smarter
- **optimized** `font-smoothing` mixin now can skip apply `font-smoothing` property when is the default value
- **optimized** mixins `spriteRetina` and `size` now skips `box-sizing` duplicates inside retina media query
- **changed** column rules mixin names to new ones where is specified the grid type `addFlexGridContainer` and `addFlexGridColumns`
- **changed** `fallbackColor` automatic fallback with a mix with a app color
- **removed** `extra` folder
- **changed** image folder var name from `@root-path` to `@path-img` to introduce `@path-font`

Release 2.0.0 details
---

**Changes**
- **changed** lot of core file locations and names to split big scss files into smaller ones
- **moved** theme `helpers` folder outside theme `components` folder which is removed
- **moved** theme `widgets` folder outside theme `components` folder which is removed
- **moved** `core/widgets` to `themes/default/widgets` folder, now the core don't own widgets anymore
- **changed** theme `base.scss` file to a list of base elements sorted by type, this will make code more readable easy to be loaded or unloaded
- **changed** `addColumnsSet` mixin now can handle different grids per viewport set, for example now you can generate `hd-6-of-12` and `tablet-2-of-4` at once
- **changed** `first-letter` selector to `up-first-letter` and added `up-first-letter-only` selector which `uppercase` the first letter and `lowecase` others
- **splitted** `setFontScaling` mixin with `setLineHeightScaling`
- **changed** `backgroundRetina` mixin, now you must set the `background-size` property to avoid unwanted background size behaviors
- **splitted** all state selectors to be more easy to be managed
- **changed** `padding` and `margin` state selector names with more intuitive ones
- **splitted** all prefix mixins to be more easy to be managed

**Features**
- **added** fallback color support to background gradient helpers
- **added** `min-width` param to `addViewportsSteps` mixin to let disabled media queries works better
- **added** the possibility to set `font-family` on input placeholder attributes with `globalPlaceholder` and `input-placeholder` mixins
- **added** `UTF8` charset encoding declaration
- **added** `fit` and `fit-window` state selectors for popups and other stuff
- **added** `scaleBackgroundSize` mixin to scale *svg* sprites easily
- **added** `setSprite` mixin to make sprite names more readable
- **added** `addMarginOffset` mixin to enable columns left margin positioning
- **added** comment `/* private */` comment before every mixin recommended as private method
- **added** scale to `setSprite` mixin
- **added** `scaleSprite` mixin to scale svg sprites easily
- **added** `addPaddingSelector` and `addMarginSelector` mixins to make padding state rules dynamic and modular
- **added** `setLineHeightScaling` mixin
- **added** `comma-separated` selector to layout state selectors
- **added** `borderImage` helper mixin
- **added** `fillImage` mixin to set `fill` property to the background images for SVG generated HTML elements
- **added** `fillRetinaImage` mixin to set `fill` property to the background images for SVG generated HTML elements on standard and retina resolutions
- **added** Filters and Transforms helpers for CSS3
- **added** `.map` files to grunt sass exporter
- **added** `font-feature-settings` CSS3 property to prefixes mixins
- **added** `animation` CSS3 property to prefixes mixins

**Fix**
- **added** `z-index` fix to `.fixed` and `.absolute` to ensure the element to be over it's siblings
- **renamed** an undefined var if `@root-path` is set to `true`
- **fixed** `spritePosition` helper with right number of values on `background-position` property
- **fixed** fallback colors for `verticalGradient`, `verticalGradientColors` and `glossGradient` mixins
- **added** missing `ieVerticalGradient` mixin inside `glossGradient` mixin
- **added** `relative` position to `body` to work better with children absolute positioning
- **added** missing `@important` to `.no-line-height`
- **fixed** selector `table-inline` to be more consistent
- **fixed** horizontal `margin` to `auto` to avoid `margin-top` and `margin-bottom` to be overridden
- **fixed** `ul` on core base now has it's default `display` property value
- **fixed** cursors to `pointer` to `a` element children
- **fixed** `moz-appearance` to default value to pass **csslint** test
- **fixed** `.unselectable` now sets text unselectable for it's children too
- **fixed** `.appearance` prefix which wasn't working properly in some cases

**Optimization**
- **moved** out adjoining classes for `.fixed` and `.absolute` state selectors
- **semplified** `glossGradient` colors not properly applied
- **disabled** text selection to `.disabled` selector
- **added** `@forcePrefixes` to `font-smoothing` to prevent the property to be skipped from `autoprefixer`
- **added** `@forcePrefixes` to `appearance` to prevent the property to be skipped from `autoprefixer`
- **semplified** nav list state selectors
- **added** `border-box` to `.size` mixin ensure a more precise sizing
- **chaged** `useFrontsizeWidgets` mixin to `@use-core-widgets` as the other parts of the app configuration
- **added** `float:none` to `asTableRow` and `asTableCell` to prevent size problems in some case
- **disabled** default widgets by default, they need to be uncommented from theme imports to be enabled
- **disabled** some `@imports` not always important to a base template
- **split** print state selectors from media query print reset styles
- **moved** original Frontsize widgets to `theme-name/widgets/frontsize` subfolder to split them from customized widgets

---

created by [Vittorio Vittori][vitto] and [Alessandro Minoccheri][minompi], sponsored by [ideato srl][ideato]

[app]:       https://github.com/ideatosrl/frontsize-less/blob/master/themes/default/app.less
[csslint]:   https://github.com/CSSLint/csslint
[csslintc]:  https://github.com/ideatosrl/frontsize-less/blob/master/.csslintrc
[docs]:      https://github.com/ideatosrl/frontsize-less/wiki
[ideato]:    http://www.ideato.it
[migration]: https://gist.github.com/vitto/9b7dfc40ef710470fed1
[minompi]:   https://twitter.com/minompi
[sass]:      https://github.com/ideatosrl/frontsize-sass
[less]:      https://github.com/ideatosrl/frontsize-less
[site]:      http://frontsize.com
[vitto]:     https://twitter.com/vttrx
