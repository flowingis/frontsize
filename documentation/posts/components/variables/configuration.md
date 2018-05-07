---
collection: variables
date: 2018-05-07T12:37
title: Configuration
view: example.twig
---

This is the list of the vars used by Frontsize:

| Var | Default value | Operates on | Description |
|-|-|-|-|
| `$bem-element` | `__` | [bem.scss][bem] | The BEM element convention prefix. |
| `$bem-modifier` | `--` | [bem.scss][bem] | The BEM modifier convention prefix. |
| `$frontsize-release-infos` | `true` | [info.scss][info] | Includes framework infos on CSS. |
| `$invalidate-cache` | `true` | [background.scss][background] | Adds a different random string based on the SASS native function `unique-id` to the theme assets loaded. |
| `$path-fonts` | `/` | [font.scss][font] | The default path for fonts. |
| `$path-images` | `/` | [background.scss][background] | The default path for theme images. |
| `$spacing` | `20px` | [math.scss][math] | The value treated by frontsize's `s` function. |
| `$use-core-base` | `false` | [base.scss][base] | It generates a reset code that can be used instead of (or with) [normalize][normalize] library. |
| `$use-core-print` | `false` | [base.scss][base] | Enables CSS default print media query behavior. |

###### Configuration file

All'interno del file troverete la configurazione degli **step** simile a questa:

```scss
$use-core-base: true;
```

[base]: https://github.com/ideatosrl/frontsize/blob/master/core/components/base.scss
[bem]: https://github.com/ideatosrl/frontsize/blob/master/core/components/bem.scss
[info]: https://github.com/ideatosrl/frontsize/blob/master/core/info.scss
[font]: https://github.com/ideatosrl/frontsize/blob/master/core/helpers/font.scss
[background]: https://github.com/ideatosrl/frontsize/blob/master/core/functions/background.scss
[math]: https://github.com/ideatosrl/frontsize/blob/master/core/functions/math.scss

[normalize]: https://github.com/ideatosrl/frontsize/blob/master/themes/_config/vendor/normalize.scss
