// install via npm, then import

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
    // add a load event listener
    image.addEventListener('load', event => image.classList.add('fade'))
  })
  .on('src:after', image => console.log(image))

// start it up

instance
  .update()           // add initial elements
  .handlers(true)     // add scroll and resize handlers

// add elements dynamically

fetch('path/to.html')
  .then(response => response.text())
  .then(html => {
    document.querySelector('.container').innerHTML(html)
    instance.update()
  })
