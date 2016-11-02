# frontsize

[![Version](http://img.shields.io/:version-4.0.0-E7C04B.svg)](https://github.com/ideatosrl/frontsize-sass/releases/tag/4.0.0) [![TravisCI](https://travis-ci.org/ideatosrl/frontsize.svg?branch=master)](https://travis-ci.org/ideatosrl/frontsize/builds) [![Built with SASS](http://img.shields.io/:language-SASS-ff6799.svg)](http://badges.github.io/badgerbadgerbadger/) [![MIT licence](http://img.shields.io/:license-MIT-00AFFF.svg)](https://github.com/ideatosrl/frontsize-sass/blob/master/LICENSE.md) [![Join the chat at https://gitter.im/ideatosrl/frontsize-sass](http://img.shields.io/:gitter-join chat-00AFFF.svg)](https://gitter.im/ideatosrl/frontsize-sass?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

>  Frontsize is not a set of widgets ready to be used in your website, it's a set
>  of mixins and functions to build BEM widgets, it's not intended to give you a
>  set of selectors, ready to be used in your style guide, this is a tool to
>  generate your sets.

## Main features

- It's [BEM] ready
- It's build to work with multiple themes in the same project
- It works fine with [dustman], a Gulp environment boilerplate built to work with multiple themes
- It's born to be flexible and customization oriented

The project was [originally developed in LESS][less], now only the SASS version is matained.

--------------------------------------------------------------------------------

## Install

Download Frontsize from node:

```
npm install --save frontsize-sass
```

--------------------------------------------------------------------------------

## Theme installation

Once you have downloaded it, copy your theme to the project front-end development folder:

```
cp -r node_modules/frontsize-sass/themes frontend/frontsize
```

Then change core references to let it point to module folder:

In `frontend/frontsize/themes/_config/import.scss` file:

```less
// from:
// @import '../../core/import';
// to:
@import '../../node_modules/frontsize-sass/core/import';
```

Now the core can be easily upgraded with `npm update frontsize-sass --save` when a new release is available.

--------------------------------------------------------------------------------

## Documentation

For now see [tests] to checkout how it works.

--------------------------------------------------------------------------------

To test frontsize:

```
npm install && npm run-script test
```

Created by [Vittorio Vittori][vitto] and [Alessandro Minoccheri][minompi] @ [ideato srl][ideato]

[app]: https://github.com/ideatosrl/frontsize-sass/blob/master/themes/default/app.scss
[automation_config]: https://github.com/ideatosrl/frontsize-sass/blob/master/frontsize.yml.dist
[automation_grunt]: https://github.com/ideatosrl/frontsize-sass/blob/master/Gruntfile.js
[automation_gulp]: https://github.com/ideatosrl/frontsize-sass/blob/master/gulpfile.js
[bem]: https://github.com/ideatosrl/frontsize-sass/blob/master/core/components/bem.scss
[bem_expressive]: https://github.com/ideatosrl/frontsize-sass/blob/master/core/components/bem-expressive.scss
[csslint]: https://github.com/CSSLint/csslint
[csslintrc]: https://github.com/ideatosrl/frontsize-sass/blob/master/.csslintrc
[docs]: https://github.com/ideatosrl/frontsize-less/wiki
[dustman]: https://github.com/ideatosrl/dustman
[grids]: https://github.com/ideatosrl/frontsize-sass/tree/master/core/grids
[ideato]: http://www.ideato.it
[less]: https://github.com/ideatosrl/frontsize-less
[migration]: https://gist.github.com/vitto/9b7dfc40ef710470fed1
[minompi]: https://twitter.com/minompi
[sass]: https://github.com/ideatosrl/frontsize-sass
[sassdoc]: http://sassdoc.com/
[site]: http://frontsize.com
[tests]: https://github.com/ideatosrl/frontsize-sass/tree/master/test/js
[vitto]: https://twitter.com/vttrx
