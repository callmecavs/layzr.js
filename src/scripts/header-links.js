'use strict';

// CONSTRUCTOR

function HeadingLinks( options ) {
  // defaults
  this._selector         = options.selector || 'h1, h2, h3';
  this._hoverLinks       = options.hoverLinks !== false;
  this._hoverHeadingAttr = options.hoverHeadingAttr || 'data-heading';
  this._hoverLinkAttr    = options.hoverLinkAttr || 'data-heading-link';

  // headings vars
  this._headings       = document.querySelectorAll(this._selector);
  this._headingsLength = this._headings.length;

  // call to create
  document.addEventListener('DOMContentLoaded', this.create(), false);
}

// METHODS

HeadingLinks.prototype.create = function() {
  // loop through headings
  for(var index = 0; index < this._headingsLength; index++) {
    // get node
    var element = this._headings[index];

    // get heading text
    var elementText = element.textContent;

    // convert text to kebab-case
    elementText = elementText.toLowerCase()                 // convert to lower case
                             .replace(/[^\w\s]/gi, '')      // remove special chars, but preserve spaces
                             .replace(/\s+/g, '-')          // replace spaces with dashes
                             .replace(/\_+/g, '');          // remove underscores

    // add id attribute to element
    element.setAttribute('id', elementText);
  }

  // optionally add hover links
  if(this._hoverLinks) {
    this.addHoverLinks();
  }
}

HeadingLinks.prototype.destroy = function() {
  // loop through headings
  for(var index = 0; index < this._headingsLength; index++) {
    // remove id attribute
    this._headings[index].removeAttribute('id');
  }
}

HeadingLinks.prototype.addHoverLinks = function() {
  // loop through headings
  for(var index = 0; index < this._headingsLength; index++) {
    // get heading
    var heading = this._headings[index];

    // add heading data attribute
    heading.setAttribute(this._hoverHeadingAttr, '');

    // save id
    var headingID = heading.id;

    // create link
    var link = document.createElement('a');

    // add link href attribute
    var linkUrl = '#' + headingID;
    link.setAttribute('href', linkUrl);
    link.setAttribute(this._hoverLinkAttr, '');

    // prepend link to heading
    heading.insertBefore(link, heading.firstChild);
  }
}

HeadingLinks.prototype.removeHoverLinks = function() {
  // loop through headings
  for(var headingIndex = 0; headingIndex < this._headingsLength; headingIndex++) {
    // get heading
    var heading = this._headings[headingIndex];

    // remove heading data attribute
    heading.removeAttribute(this._hoverHeadingAttr);

    // get the children
    var children = heading.children;

    // cache children length
    var childrenLength = children.length;

    // loop through children
    for(var childrenIndex = 0; childrenIndex < childrenLength; childrenIndex++) {
      // remove only the link with heading
      if(children[childrenIndex].hasAttribute(this._hoverLinkAttr)) {
        children[childrenIndex].parentNode.removeChild(children[childrenIndex]);

        // stop after we find it
        break;
      }
    }
  }
}

HeadingLinks.prototype.getList = function() {
  // return node list of headings
  return this._headings;
}
