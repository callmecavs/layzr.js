'use strict';

var isRetina = window.devicePixelRatio > 1;

// CONSTRUCTOR

function Layzr(options) {
  // debounce
  this._ticking    = false;

  //config options
  this.config(options)

  // properties
  this._srcAttr = isRetina ? this._optionsAttrRetina : this._optionsAttr;

  // call to create
  this._create();
}

Layzr.prototype.config = function(options) {
  // options
  options = options || {};

  this._optionsContainer  = document.querySelector(options.container) || window;
  this._optionsSelector   = options.selector || this._optionsSelector || '[data-layzr]';
  this._optionsAttr       = options.attr || this._optionsAttr || 'data-layzr';
  this._optionsAttrRetina = options.retinaAttr || this._optionsAttrRetina || 'data-layzr-retina';
  this._optionsAttrBg     = options.bgAttr || this._optionsAttrBg || 'data-layzr-bg';
  this._optionsAttrHidden = options.hiddenAttr || this._optionsAttrHidden || 'data-layzr-hidden';
  this._optionsThreshold  = options.threshold || this._optionsThreshold || 0;
  this._optionsCallback   = options.callback || this._optionsCallback || null;
}

// DEBOUNCE HELPERS
// adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

Layzr.prototype._requestScroll = function() {
  if(!this._ticking) {
    requestAnimationFrame(this.update.bind(this));
    this._ticking = true;
  }
};

// OFFSET HELPER
// remember, getBoundingClientRect is relative to the viewport

Layzr.prototype._getOffset = function(node) {
  return node.getBoundingClientRect().top + window.pageYOffset;
};

// HEIGHT HELPER
Layzr.prototype._getContainerHeight = function() {
  return this._optionsContainer.innerHeight
      || this._optionsContainer.offsetHeight;
}

// LAYZR METHODS
Layzr.prototype._create = function() {
  //cache the event handler for destroying
  var handler = this._requestScrollHandler = this._requestScroll.bind(this);

  // fire scroll event once
  this._requestScroll();

  // bind scroll and resize event
  this._optionsContainer.addEventListener('scroll', handler, false);
  this._optionsContainer.addEventListener('resize', handler, false);
};

Layzr.prototype.destroy = function() {
  // possibly remove attributes, and set all sources?

  if (this._requestScrollHandler) {
    // unbind scroll and resize event
    this._optionsContainer.removeEventListener('scroll', this._requestScrollHandler, false);
    this._optionsContainer.removeEventListener('resize', this._requestScrollHandler, false);
  }
};

Layzr.prototype._inViewport = function(node) {
  
  // get viewport top and bottom offset
  var viewportTop

  if(this._optionsContainer === window) {
    viewportTop = window.pageYOffset;
  }
  else {
    viewportTop = this._optionsContainer.scrollTop + this._getOffset(this._optionsContainer);
  }

  var viewportBottom = viewportTop + this._getContainerHeight();

  // get node top and bottom offset
  var nodeTop = this._getOffset(node);
  var nodeBottom = nodeTop + this._getContainerHeight();

  // calculate threshold, convert percentage to pixel value
  var threshold = (this._optionsThreshold / 100) * window.innerHeight;

  // return if node in viewport
  return nodeBottom >= viewportTop - threshold
      && nodeTop <= viewportBottom + threshold
      && !node.hasAttribute(this._optionsAttrHidden);
};

Layzr.prototype._reveal = function(node) {
  // get node source
  var source = node.getAttribute(this._srcAttr) || node.getAttribute(this._optionsAttr);

  //if source is'nt exist, just return
  if (!source) {
    return
  }

  // set node src or bg image
  if(node.hasAttribute(this._optionsAttrBg)) {
    node.style.backgroundImage = 'url(' + source + ')';
  }
  else {
    node.setAttribute('src', source);
  }

  // call the callback
  if(typeof this._optionsCallback === 'function') {
    // "this" will be the node in the callback
    this._optionsCallback.call(node);
  }

  // remove node data attributes
  node.removeAttribute(this._optionsAttr);
  node.removeAttribute(this._optionsAttrRetina);
  node.removeAttribute(this._optionsAttrBg);
  node.removeAttribute(this._optionsAttrHidden);
};


Layzr.prototype.query = function() {
  //just focus the image that in the container
  var container = this._optionsContainer === window ? document : this._optionsContainer
  return container.querySelectorAll(this._optionsSelector);
};


Layzr.prototype.update = function() {

  var nodes = this.query();

  //reverse loop through nodes
  for (var i = nodes.length - 1; i >= 0; i--) {
    // cache node
    var node = nodes[i];

    // check if node has mandatory attribute
    // check if node in viewport
    if(node.hasAttribute(this._optionsAttr) && this._inViewport(node)) {
      // reveal node
      this._reveal(node);
    }
  }

  // allow for more animation frames
  this._ticking = false;
};