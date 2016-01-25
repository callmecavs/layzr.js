// use the default options

const instance = Layzr()

// start it up, when the DOM is ready

document.addEventListener('DOMContentLoaded', event => {
  instance
    .update()           // track initial elements
    .check()            // check initial elements
    .handlers(true)     // bind scroll and resize handlers
})
