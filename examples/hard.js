// import (installed via npm)

import Layzr from 'layzr.js'

// use a custom configuration

const config = {
  normal: 'data-example-normal',
  retina: 'data-example-retina',
  srcset: 'data-example-srcset'
}

const instance = Layzr(config)

// add callbacks

instance
  .on('src:before', image => {
    // detect load event
    image.addEventListener('load', event => {
      // ...
    })
  })
  .on('src:after', image => console.log(image))

// start it up

instance
  .update()           // add initial elements
  .handlers(true)     // add scroll and resize handlers

// add elements

fetch('path/to.html')
  .then(response => response.text())
  .then(html => {
    document.querySelector('.container').innerHTML(html)
    instance.update()
  })
