// install from npm, then import

import Layzr from 'layzr.js'

// use custom options

const instance = Layzr({
  normal: 'data-example-normal',
  retina: 'data-example-retina',
  srcset: 'data-example-srcset'
})

// add callbacks

instance
  .on('src:before', image => {
    // add a load event listener
    image.addEventListener('load', event => {
      // ...
    })
  })
  .on('src:after', image => {
    // ...
  })

// start it up, when the DOM is ready

document.addEventListener('DOMContentLoaded', event => {
  instance
    .update()           // track initial elements
    .check()            // check initial elements
    .handlers(true)     // bind scroll and resize handlers
})

// add elements dynamically

fetch('path/to.html')
  .then(response => response.text())
  .then(html => {
    document.querySelector('.container').innerHTML(html)

    // track new elements
    instance.update()
  })
