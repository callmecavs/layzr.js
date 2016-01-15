# Layzr.js

[![Layzr.js on NPM](https://img.shields.io/npm/v/layzr.js.svg)](https://www.npmjs.com/package/layzr.js) [![Layzr.js on Gitter](https://img.shields.io/badge/gitter-join%20chat-green.svg)](https://gitter.im/callmecavs/layzr.js)

A small, fast, and modern library for lazy loading images.

* [Demo Page](http://callmecavs.github.io/layzr.js/)

## Usage

Layzr was developed with a modern JavaScript workflow in mind. To use it, it's recommended you have a build system in place that can transpile ES6, and bundle modules. For a minimal boilerplate that does so, check out [outset](https://github.com/callmecavs/outset).

Follow these steps to get started:

* [Install](#install)
* [Instantiate](#instantiate)

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
