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
    // ...
  })
  .on('src:after', image => {
    // ...
  })

// start it up

instance
  .update()           // add initial elements
  .handlers(true)     // add scroll and resize handlers
