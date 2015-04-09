'use strict';

// CONSTRUCTOR

function Layzr( options ) {
  // debounce
  this._lastScroll = 0;
  this._ticking = false;

  // options
  this._optionsAttr = options.attr || 'data-layzr';
  this._optionsAttrRetina = options.retinaAttr || 'data-layzr-retina';
  this._callback = options.callback || null;

  // properties
  this._retina = window.devicePixelRatio > 1 ? true : false;
  this._imgAttr = this._retina ? this._optionsAttrRetina : this._optionsAttr;

  // images nodelist
  this._images = document.getElementsByTagName('img');

  // call to create
  document.addEventListener('DOMContentLoaded', this._create(), false);
}

// DEBOUNCE METHODS
// adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

Layzr.prototype._requestScroll = function() {
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
  // call update once
  this.update();

  // bind scroll and resize event
  window.addEventListener('scroll', this._requestScroll.bind(this), false);
  window.addEventListener('resize', this._requestScroll.bind(this), false);
}

Layzr.prototype._destroy = function() {
  // possibly remove attributes, and set all sources?

  // unbind scroll and resize event
  window.removeEventListener('scroll', this._requestScroll.bind(this), false);
  window.removeEventListener('resize', this._requestScroll.bind(this), false);
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
  // get viewport top and bottom offset
  var viewportTop = this._lastScroll;
  var viewportBottom = viewportTop + window.innerHeight;

  // get image top and bottom offset
  var elementTop = this._getOffset(imageNode);
  var elementBottom = elementTop + imageNode.offsetHeight;

  // return if element in viewport
  return elementBottom >= viewportTop && elementBottom <= viewportBottom;
}

Layzr.prototype.update = function() {
  // cache image nodelist length
  var imagesLength = this._images.length;

  // loop through images
  for(var i = 0; i < imagesLength; i++) {
    // cache image
    var image = this._images[i];

    // check if image has attribute
    if(image.hasAttribute(this._imgAttr)) {
      // check if image in viewport
      if(this._inViewport(image)) {
        // reveal image
        this.reveal(image);
      }
    }
  }

  // allow for more animation frames
  this._ticking = false;
}

Layzr.prototype.reveal = function( imageNode ) {
  // get image source
  var source = imageNode.getAttribute(this._imgAttr);

  // remove image data attributes
  imageNode.removeAttribute(this._optionsAttr);
  imageNode.removeAttribute(this._optionsAttrRetina);

  // set image source
  imageNode.setAttribute('src', source);

  // call the callback
  if(typeof this._callback === "function") {
    // this will be the image node in the callback
    this._callback.call(imageNode);
  }
}
