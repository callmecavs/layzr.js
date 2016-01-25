// use custom options

const instance = Layzr({
  normal: 'data-example-normal',
  retina: 'data-example-retina',
  srcset: 'data-example-srcset'
})

// add callbacks

instance
  .on('src:before', image => {
    // ...
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
