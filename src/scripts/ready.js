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
  this._images = document.getElementsByTagName('img');

  // call to init
  document.addEventListener('DOMContentLoaded', this._create(), false);
}

// DEBOUNCE METHODS
// adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

Layzr.prototype._requestScroll = function() {
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

Layzr.prototype._create = function() {
  // bind scroll and resize event
  window.addEventListener('scroll', this._requestScroll.bind(this), false);
  window.addEventListener('resize', this._requestScroll.bind(this), false);
}

// offset helper
// borrow from: http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document

Layzr.prototype._getOffset = function( element ) {
  var offsetTop  = 0;

  do {
    if(!isNaN(element.offsetTop)) {
      offsetTop  += element.offsetTop;
    }
  } while (element = element.offsetParent);

  return offsetTop;
}

Layzr.prototype._inViewport = function( imageNode ) {
  // get viewport
  var viewportTop = this._lastScroll;
  var viewportBottom = viewportTop + window.innerHeight;

  // get image offset top and left
  var elementTop = this._getOffset(imageNode);
  var elementBottom = elementTop + imageNode.offsetHeight;

  // return based on position
  return elementBottom >= viewportTop && elementBottom <= viewportBottom;
}

Layzr.prototype.update = function() {
  // cache image NodeList length
  var imagesLength = this._images.length;

  // loop through images
  for(var i = 0; i < imagesLength; i++) {
    // cache image
    // TODO: is it smart to declare this variable repeatedly here?
    var image = this._images[i];

    // check if it has our attribute
    if(image.hasAttribute(this._imgAttr)) {
      // check if in viewport
      if(this._inViewport(image)) {
        // reveal image
        this.reveal(image);
      }
    }
  }

  // allow more animation frames
  this._ticking = false;
}

Layzr.prototype.reveal = function( imageNode ) {

}
