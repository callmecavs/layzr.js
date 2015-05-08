# Layzr.js

[![Layzr.js on NPM](https://img.shields.io/npm/v/layzr.js.svg)](https://www.npmjs.com/package/layzr.js) [![Layzr.js on Bower](https://img.shields.io/bower/v/layzr.js.svg)](http://bower.io/search/?q=layzr.js) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/callmecavs/layzr.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

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

Create a new instance with your desired options. Defaults shown below:

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

All options are fully customizable. Review the [Options](http://callmecavs.github.io/layzr.js/#options) section of the documentation for more details.

## Docs

See the project page for documentation. Section links below:

* [Usage](http://callmecavs.github.io/layzr.js/#usage)
* [Options](http://callmecavs.github.io/layzr.js/#options)
* [Browsers](http://callmecavs.github.io/layzr.js/#browsers)

## Roadmap

- [ ] Add to CDN?

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
