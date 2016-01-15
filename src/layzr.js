import knot from 'knot.js'

export default (options = {}) => {
  // options

  const settings = {
    selector: options.selector || '[data-layzr]',
    src: options.src || 'data-src',
    srcset: options.srcset || 'data-srcset',
    threshold: options.threshold || 0
  }

  // events

  const events = [
    'scroll',
    'resize'
  ]

  // feature detection
  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/srcset.js

  const srcset = 'srcset' in document.createElement('img')

  // cache

  let elements
  let prevLoc
  let ticking

  // instance

  const instance = knot({
    start: start,
    stop: stop,
    check: check,
    update: update
  })

  return instance

  // debounce helpers

  function requestScroll() {
    prevLoc = window.scrollY || window.pageYOffset
    requestFrame()
  }

  function requestFrame() {
    if(!ticking) {
      requestAnimationFrame(() => check())
      ticking = true
    }
  }

  // offset helper

  function getOffset(node) {
    return node.getBoundingClientRect().top + prevLoc
  }

  // in viewport helper

  function inViewport(node) {
    const winHeight = window.innerHeight

    const viewTop = prevLoc
    const viewBot = viewTop + winHeight

    const nodeTop = getOffset(node)
    const nodeBot = nodeTop + node.offsetHeight

    const offset = (settings.threshold * 100) / winHeight

    return nodeBot >= viewTop - offset
        && nodeTop <= viewBot + offset
  }

  // source helpers

  function setSource(node) {
    // check for srcset support and attribute
    if(srcset && node.hasAttribute(settings.srcset)) {
      node.setAttribute('srcset', node.getAttribute(settings.srcset))
      return
    }
  }

  // API

  function start() {
    events.forEach(event => window.addEventListener(event, requestScroll))
    return this
  }

  function stop() {
    events.forEach(event => window.removeEventListener(event, requestScroll))
    return this
  }

  function check() {
    elements.forEach(element => {
      inViewport(element) && setSource(element)
    })

    ticking = false
    return this
  }

  function update() {
    elements = [...document.querySelectorAll(settings.selector)]
    return this
  }
}
