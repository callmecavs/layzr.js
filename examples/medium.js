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

// start it up

instance
  .update()           // track initial elements
  .handlers(true)     // bind scroll and resize handlers
