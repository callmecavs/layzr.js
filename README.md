# Layzr.js

[![Layzr.js on NPM](https://img.shields.io/npm/v/layzr.js.svg)](https://www.npmjs.com/package/layzr.js) [![Layzr.js on Bower](https://img.shields.io/bower/v/layzr.js.svg)](http://bower.io/search/?q=layzr.js) [![Layzr.js on Gitter](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/callmecavs/layzr.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A small, fast, modern, and dependency-free library for lazy loading.

* [Demo Page](http://callmecavs.github.io/layzr.js/)

## Usage

Lazy loading boosts page speed by deferring the loading of images until they're in (or near) the viewport. This library makes it completely painless - maximizing speed by keeping options to a minimum.

### Install

Load the script.

[Download it](https://github.com/callmecavs/layzr.js/archive/master.zip), install it with [NPM](https://www.npmjs.com/package/layzr.js), or install it with [Bower](http://bower.io/search/?q=layzr.js).

```html
<script src="layzr.js"></script>
```

### Image Setup

For each `img` and/or `iframe` you want to lazy load, put the `src` in the `data-layzr` attribute.

```html
<img data-layzr="image/source">
<iframe data-layzr="media/source"></iframe>
```

This is the only _required_ attribute. Advanced, _optional_ configuration follows:

#### (Optional) Placeholders

Include a placeholder, via the `src` attribute.

Images without a placeholder - _before_ they're loaded - may impact layout (no width/height), or appear broken.

```html
<img src="optional/placeholder" data-layzr="image/source">
```

#### (Optional) Retina Support

Include a retina (high-resolution) version of the image in the `data-layzr-retina` attribute. This source will only be loaded if the [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) is greater than 1.

Ensure the proper CSS is in place to display both regular and retina images correctly. This library handles the loading, but not the displaying, of elements.

```html
<img data-layzr="image/source" data-layzr-retina="optional/retina/source">
```

#### (Optional) Background Images

Include the `data-layzr-bg` attribute to load the source as a background image.

The `data-layzr-bg` attribute should be valueless - the image source is still taken from the `data-layzr` and `data-layzr-retina` attributes.

```html
<img data-layzr="image/source" data-layzr-bg>
```

### Instance Creation

Create a new instance, and that's it!

```javascript
var layzr = new Layzr();
```

Documentation for all options follows:

## Options

Defaults shown below:

```javascript
var layzr = new Layzr({
  selector: '[data-layzr]',
  attr: 'data-layzr',
  retinaAttr: 'data-layzr-retina',
  bgAttr: 'data-layzr-bg',
  threshold: 0,
  callback: null
});
```

Explanation of each follows:

### selector

Customize the selector used to find elements to lazy load - using CSS selector syntax.

```javascript
var layzr = new Layzr({
  selector: '[data-layzr]'
});
```

### attr / retinaAttr

Customize the data attributes that image sources are taken from.

```javascript
var layzr = new Layzr({
  attr: 'data-layzr',
  retinaAttr: 'data-layzr-retina'
});
```

### bgAttr

Customize the data attribute that loads the image as a background.

```javascript
var layzr = new Layzr({
  bgAttr: 'data-layzr-bg'
});
```

### threshold

Adjust when images load, relative to the viewport. Positive values make elements load _sooner_.

Threshold is a percentage of the viewport height - think of it as similar to the CSS `vh` unit.

```javascript
// load images when they're half the viewport height away from the bottom of the viewport

var layzr = new Layzr({
  threshold: 50
});
```

### callback

Invoke a callback function each time an image is loaded.

The image _may not be fully loaded before the function is called_. Detecting image load is inconsistent at best in modern browsers.

```javascript
// in the callback function, "this" refers to the image node

var layzr = new Layzr({
  callback: function() {
    this.classList.add('class');
  }
});
```

## Browser Support

Layzr natively supports **IE10+**.

To extend support to older browsers, consider including [Paul Irish's polyfill](https://gist.github.com/paulirish/1579671) for [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

There are currently no plans to include the polyfill in the library, in the interest of file size.

## Docs

The project page includes additional documentation. Relevant section links below:

* [Options](http://callmecavs.github.io/layzr.js/#options)

## Roadmap

- [ ] Add to CDN?

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
