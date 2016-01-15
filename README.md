# Layzr.js

[![Layzr.js on NPM](https://img.shields.io/npm/v/layzr.js.svg)](https://www.npmjs.com/package/layzr.js) [![Layzr.js on Gitter](https://img.shields.io/badge/gitter-join%20chat-green.svg)](https://gitter.im/callmecavs/layzr.js)

A small, fast, and modern library for lazy loading images.

* [Demo Page](http://callmecavs.github.io/layzr.js/)

## Getting Started

Layzr was developed with a modern JavaScript workflow in mind. Though not required to use Layzr, it's convenient to have a build system in place that can transpile ES6, and bundle modules. For a minimal boilerplate that does so, check out [outset](https://github.com/callmecavs/outset).

Follow these steps to get started:

1. [Install](#install)
2. [Setup Images](#setup-images)
3. [Instantiate](#instantiate)

## Install

Choose one of the following installation options, based on what best suits your project and environment.

* [npm](#npm)
* [CDN](#cdn)
* [Download](#download)

Refer to the [releases](https://github.com/callmecavs/layzr.js/releases) page for version specific information.

### npm

Install Layzr, and add it to your `package.json` dependencies.

```
$ npm install layzr.js --save
```

### CDN

Copy and paste one of the following `<script>` tags.

Note the version number in the `src` attributes.

#### [jsDelivr](http://www.jsdelivr.com/projects/layzr.js)

```html
<script src="https://cdn.jsdelivr.net/layzr.js/2.0.0/layzr.min.js"></script>
```

#### [cdnjs](https://cdnjs.com/libraries/layzr.js)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/layzr.js/2.0.0/layzr.min.js"></script>
```

### Download

[Download](https://github.com/callmecavs/layzr.js/archive/master.zip) the latest version, and load the script in the `dist` folder.

```html
<script src="layzr.min.js"></script>
```

## Setup Images

Layzr intelligently chooses the best source available, **based on the image's data attributes and feature detection**. Note that all **attributes are configureable** via the [options](#options) passed to the constructor.

* In browsers that [support `srcset`](http://caniuse.com/#search=srcset), if available, it will be used to determine the source.
* In browsers that don't, the normal or retina source will be chosen based on availability and the [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio).

To indicate potential sources, add the following attributes to your images:

1. **Required**: [`data-normal`](#data-normal)
2. **Optional**: [`data-retina`](#data-retina)
3. **Optional**: [`data-srcset`](#data-source-set)

### data-normal

Put the **normal resolution** source in the `data-normal` attribute.

```html
<img data-normal="normal.jpg">
```

### data-retina

Put the **retina/high resolution** source in the `data-retina` attribute.

```html
<img data-normal="normal.jpg" data-retina="retina.jpg">
```

### data-srcset

Put the **source set** in the `data-srcset` attribute. For information on the proper syntax, read the official [specification](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img).

```html
<img data-normal="normal.jpg" data-retina="retina.jpg" data-srcset="small.jpg 320w, medium.jpg 768w, large.jpg 1024w">
```

## Instantiate

If necessary, import Layzr. Then, create an instance, passing in your options.

Be sure to **assign your Layzr instance to a variable**. Using your instance, you can:

* start and stop the event listeners
* handle dynamically added elements
* bind callback handlers

```es6
// import Layzr (npm install only)

import Layzr from 'layzr.js'

// create an instance
// default options shown below

const instance = Layzr({
  normal: 'data-normal',
  retina: 'data-retina',
  srcset: 'data-srcset',
  threshold: 0
})
```

## Browser Support

Layzr depends on the following browser APIs:

* ES5 array methods: [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
* [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

It supports the following natively:

* Chrome 24+
* Firefox 23+
* Safari 6.1+
* Opera 15+
* Edge 12+
* IE 10+
* iOS Safari 7.1+
* Android Browser 4.4+

To support older browsers, consider including [polyfills/shims](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills) for the APIs listed above. There are **no plans to include any in the library**, in the interest of file size.

## License

MIT. © 2016 Michael Cavalea
