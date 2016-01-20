# Layzr.js

[![Layzr.js on NPM](https://img.shields.io/npm/v/layzr.js.svg)](https://www.npmjs.com/package/layzr.js) [![Layzr.js on Gitter](https://img.shields.io/badge/gitter-join%20chat-green.svg)](https://gitter.im/callmecavs/layzr.js)

A small, fast, and modern library for lazy loading images.

* [Demo Page](http://callmecavs.github.io/layzr.js/)

## Getting Started

Layzr was developed with a modern JavaScript workflow in mind. Though not required, it's convenient to have a build system in place that can transpile ES6, and bundle modules. For a minimal boilerplate that does so, try [outset](https://github.com/callmecavs/outset).

To get started, follow these steps:

1. [Install](#install)
2. [Setup Images](#setup-images)
3. [Instantiate](#instantiate)
4. [Review Options](#options)
5. [Review Events](#events)
6. [Review API](#api)
7. **[Review Example Code](https://github.com/callmecavs/layzr.js/tree/master/examples)**
  * Examples progress like a coffee addiction: small -> medium -> large

## Install

Choose an installation option based on your project and environment.

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

Copy and paste one of the following `<script>` tags. Note the version number in the `src` attributes.

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

Layzr intelligently chooses the best image source available **based on an image's data attributes and browser feature detection**.

* In browsers that [support `srcset`](http://caniuse.com/#search=srcset), if available, it will be used to determine the source.
* In browsers that don't, the normal or retina source will be chosen based on the [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) and availability.

To indicate potential sources, add the following attributes to your images. Note that all attribute names are configureable via the [options](#options) passed to the constructor.

|  Required      | Name                            |
| :------------: | :-----------------------------: |
|  ✓             |  [`data-normal`](#data-normal)  |
|                |  [`data-retina`](#data-retina)  |
|                |  [`data-srcset`](#data-srcset)  |

### data-normal

Put the _normal resolution_ source in the `data-normal` attribute.

```html
<img data-normal="normal.jpg">
```

Note that Layzr **selects elements using this attribute**. Elements without it won't be tracked, and will never load.

### data-retina

Add the _retina/high resolution_ source in the `data-retina` attribute.

```html
<img data-normal="normal.jpg" data-retina="retina.jpg">
```

### data-srcset

Add the _source set_ in the `data-srcset` attribute. For information on the proper syntax, read the official [specification](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img).

```html
<img data-normal="normal.jpg" data-retina="retina.jpg" data-srcset="small.jpg 320w, medium.jpg 768w, large.jpg 1024w">
```

## Instantiate

Create an instance, optionally passing in your [options](#options).

Be sure to **assign your Layzr instance to a variable**. Using your instance, you can:

* start and stop the event listeners
* add and remove event handlers
* accommodate dynamically added elements

```es6
// using the default options

const instance = Layzr()

// using custom options

const instance = Layzr({
  // ...
})
```

Options are explained in the following section.

## Options

Default options are shown below, and an explanation of each follows:

```es6
const instance = Layzr({
  normal: 'data-normal',
  retina: 'data-retina',
  srcset: 'data-srcset',
  threshold: 0
})
```

### normal

Customize the attribute the normal resolution source is taken from.

```es6
const instance = Layzr({
  normal: 'data-normal'
})
```

### retina

Customize the attribute the retina/high resolution source is taken from.

```es6
const instance = Layzr({
  retina: 'data-retina'
})
```

### srcset

Customize the attribute the source set is taken from.

```es6
const instance = Layzr({
  srcset: 'data-srcset'
})
```

### threshold

Adjust when images load, relative to the viewport. _Positive values make images load sooner, negative values make images load later_.

Threshold is a percentage of the viewport height, identical to the CSS `vh` unit.

```es6
const instance = Layzr({
  threshold: 0
})
```

## Events

Layzr instances are extended with [Knot.js](https://github.com/callmecavs/knot.js), a browser-based event emitter. Use the event emitter syntax to add and remove handlers. Review the emitter syntax [here](https://github.com/callmecavs/knot.js#api).

Layzr emits the following events:

* [src:before](#srcbefore)
* [src:after](#srcafter)

### src:before

This event is emitted immediately _before an image source is set_. The image node is passed to the event handler.

```es6
instance.on('src:before', (element) => {
  // 'this' is your Layzr instance
  // 'element' is the image node
  // ...
})
```

Load event handlers should be attached using this event. See the [example](https://github.com/callmecavs/layzr.js/blob/v2.0.0/examples/large.js), and note the [caveats](https://api.jquery.com/load-event/) associated with image load events before proceeding.

### src:after

This event is emitted immediately _after an image source is set_. The image node is passed to the event handler.

```es6
instance.on('src:after', (element) => {
  // 'this' is your Layzr instance
  // 'element' is the image node
  // ...
})
```

Note that the image is not necessarily done loading when this event fires.

## API

All API methods are **chainable**, including those from the emitter.

### .handlers(flag)

Add or remove the `scroll` and `resize` event handlers.

```es6
instance
  .handlers(true)       // 'true' adds them
  .handlers(false)      // 'false' removes them
```

### .check()

Manually check if elements are in the viewport.

This method is called while the `window` is scrolled or resized.

```es6
instance.check()
```

### .update()

Update the elements Layzr is checking.

```es6
instance.update()
```

**Dynamically added elements** should be handled using this method. See the [example](https://github.com/callmecavs/layzr.js/blob/v2.0.0/examples/large.js).

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

## Colophon

* Site Design: [Chris Allen](https://dribbble.com/cp_allen)
* Stock Photos: [Unsplash](https://unsplash.com/)

## License

MIT. © 2016 Michael Cavalea

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
