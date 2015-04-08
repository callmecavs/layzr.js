'use strict';

// CONSTRUCTOR

function Layzr( options ) {
  // debounce
  this._lastScroll = 0;
  this._ticking = false;

  // properties
  this._retina = window.devicePixelRatio > 1 ? true : false;
  this._imgAttr = this._retina ? options.retinaAttr || 'data-layzr-retina' : options.attr || 'data-layzr';

  this._selector = '[' + this._imgAttr + ']';
  this._images = document.querySelectorAll(this._selector);

  // call to init
  document.addEventListener('DOMContentLoaded', this.init(), false);
}

// DEBOUNCE METHODS
// adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

Layzr.prototype._updateScroll = function() {
  // TODO: make sure we're scrolling down, not up?
  this._lastScroll = window.scrollY;
  this._requestTick();
}

Layzr.prototype._requestTick = function() {
  if(!this._ticking) {
    requestAnimationFrame(this.update.bind(this));
    this._ticking = false;
  }
}

// Layzr METHODS

Layzr.prototype.init = function() {
  // bind scroll event
  window.addEventListener('scroll', this._updateScroll.bind(this), false);
}

Layzr.prototype.update = function() {
  // TODO: maybe optimize by using getElementsByTag (live node list) and checking for data attr,
  // rather than querySelectorAll every scroll event?

  // update list of images
  this._images = document.querySelectorAll(this._selector);

  // cache length
  var imagesLength = this._images.length;

  // loop through images
  for(var i = 0; i < imagesLength; i++) {
    // cache image
    var image = this._images[i];

    // check if in viewport
    this.reveal(image);
  }

  // allow more animation frames
  this._ticking = false;
}

Layzr.prototype.reveal = function( imageNode ) {
  console.log(imageNode);
}
