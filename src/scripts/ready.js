'use strict';

// CONSTRUCTOR

function Layzr( options ) {
  // debounce
  this._lastScroll = 0;
  this._ticking = false;

  // defaults
  this._retina = window.devicePixelRatio > 1 ? true : false;
  this._imgAttr = this._retina ? options.retinaAttr || 'data-layzr-retina' : options.attr || 'data-layzr';

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
    requestAnimationFrame(this.update);
    this._ticking = false;
  }
}

// Layzr METHODS

Layzr.prototype.init = function() {
  // bind scroll event
  window.addEventListener('scroll', this._updateScroll.bind(this), false);
}

Layzr.prototype.update = function() {

  this._ticking = false;
}
