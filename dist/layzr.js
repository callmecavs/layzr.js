(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define([], factory);
  } else if(typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Layzr = factory();
  }
}(this, function() {
  'use strict';

  // CONSTRUCTOR

  function Layzr( options ) {
    // debounce
    this._lastScroll = 0;
    this._ticking = false;

    // options
    this._selector = options.selector || 'img';
    this._optionsAttr = options.attr || 'data-layzr';
    this._optionsAttrRetina = options.retinaAttr || 'data-layzr-retina';
    this._optionsThreshold = options.threshold || 0;
    this._optionsCallback = options.callback || null;

    // properties
    this._retina = window.devicePixelRatio > 1;
    this._sourceAttr = this._retina ? this._optionsAttrRetina : this._optionsAttr;

    // nodes LIVE nodelist
    this._nodes = document.querySelectorAll(this._selector);

    // call to create
    this._create();
  }

  // DEBOUNCE METHODS
  // adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

  Layzr.prototype._requestScroll = function() {
    this._lastScroll = window.scrollY || window.pageYOffset;
    this._requestTick();
  }

  Layzr.prototype._requestTick = function() {
    if(!this._ticking) {
      requestAnimationFrame(this.update.bind(this));
      this._ticking = true;
    }
  }

  // Layzr METHODS

  Layzr.prototype._create = function() {
    // fire scroll event once
    this._requestScroll();

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
  // borrowed from: http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document

  Layzr.prototype._getOffset = function( element ) {
    var offsetTop  = 0;

    do {
      if(!isNaN(element.offsetTop)) {
        offsetTop  += element.offsetTop;
      }
    } while (element = element.offsetParent);

    return offsetTop;
  }

  Layzr.prototype._inViewport = function( node ) {
    // get viewport top and bottom offset
    var viewportTop = this._lastScroll;
    var viewportBottom = viewportTop + window.innerHeight;

    // get node top and bottom offset
    var elementTop = this._getOffset(node);
    var elementBottom = elementTop + node.offsetHeight;

    // calculate threshold, convert percentage to pixel value
    var threshold = (this._optionsThreshold / 100) * window.innerHeight;

    // return if element in viewport
    return elementBottom >= viewportTop - threshold && elementBottom <= viewportBottom + threshold;
  }

  Layzr.prototype.update = function() {
    // cache nodelist length
    var nodesLength = this._nodes.length;

    // loop through nodes
    for(var i = 0; i < nodesLength; i++) {
      // cache node
      var node = this._nodes[i];

      // check if node has attribute
      if(node.hasAttribute(this._sourceAttr) || node.hasAttribute(this._optionsAttr)) {
        // check if node in viewport
        if(this._inViewport(node)) {
          // reveal node
          this.reveal(node);
        }
      }
    }

    // allow for more animation frames
    this._ticking = false;
  }

  Layzr.prototype.reveal = function( node ) {
    // get source
    var source = node.getAttribute(this._sourceAttr) || node.getAttribute(this._optionsAttr);

    // remove data attributes
    node.removeAttribute(this._optionsAttr);
    node.removeAttribute(this._optionsAttrRetina);

    // set source, if it has one
    if(source) {
      node.setAttribute('src', source);

      // call the callback
      if(typeof this._optionsCallback === 'function') {
        // this will be the node in the callback
        this._optionsCallback.call(node);
      }
    }
  }

  return Layzr;
}));
