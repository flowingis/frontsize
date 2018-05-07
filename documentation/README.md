<img width="64" height="auto" src="https://raw.githubusercontent.com/ideatosrl/crysalicss/master/src/crysalicss-logo.png">

# CrysaliCSS
A component library template to store your CSS code

---

<img width="100%" height="auto" src="https://raw.githubusercontent.com/ideatosrl/crysalicss/master/src/showreel.gif">

#### Installation

To install **CrysaliCSS** just clone it:

```
git clone https://github.com/ideatosrl/crysalicss.git component-library && rm -rf component-library/.git
```

This script will create a folder named `component-library` where the template is ready to be used to host your CSS components. This also removes the `.git` folder to ensure it is correctly tracked into your project.

---

#### Development

To test locally the component library usually at [this address](http://localhost:3000):

```
npm run dev
```

This script will run watchers and **browser sync** to ensure everything you update will be detected, so `twig` templates, `sass` styles, `md` posts, `js` scripts, assets and also `metalsmith.js` and `metalsmith.yml` files.

If you are working with a **virtual machine** and you don't need **browser sync**, you can run watchers only with this:

```
npm run watch
```

---

To build your library without run any watchers / HTTP servers:

```
npm run build
```

The library will be built inside `build` folder with relative paths, this means it should run without the HTTP server.

---

#### Configuration

This is the configuration of **CrysaliCSS** component library ONLY.

To let your **CSS source** run inside the component library, you'll need to customize the `source-styles` npm script [stored here][source_css_path].

| File | Description |
|-|-|
| `metalsmith.yml` | This is the main **Metalsmith** configuration used inside `metalsmith.js`, there is background and viewports configuration, then all the stuff you need to customize. Be sure your [CSS source is correctly set here][source_css_name]. The **icons** are based on [Material design icons][material] codes. |

Some info about the project folders

| Folder | Description |
|-|-|
| `assets` | Where all images are stored. |
| `js` | Where all **JavaScript** files are stored, like iframe nav or clipboard interaction. |
| `posts` | Where all **Markdown** documentation posts are stored. You will add HTML components and how they work with [markdown syntax][markdown]. |
| `sass` | The component library styles, you can customize it's [main colors here][theme_colors] in combination with the [selected logo][logo]. |
| `src` | Just source files, not used inside the build. |
| `twig` | The **HTML templates** written with [Twig][twig]. |

---

[CrysaliCSS](https://github.com/ideatosrl/crysalicss) is made with ❤ by [vitto](https://github.com/vitto/) @ [ideato](https://www.ideato.it).

[logo]: https://github.com/ideatosrl/crysalicss/blob/master/metalsmith.yml#L8
[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[material]: https://material.io/icons/
[source_css_name]: https://github.com/ideatosrl/crysalicss/blob/master/metalsmith.yml#L7
[source_css_path]: https://github.com/ideatosrl/crysalicss/blob/master/package.json#L17
[theme_colors]: https://github.com/ideatosrl/crysalicss/blob/master/sass/_config/vars.scss
[twig]: https://twig.symfony.com/
