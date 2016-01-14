import knot from 'knot.js'

export default (options = {}) => {
  // options

  const selector  = options.selector || '[data-layzr]'
  const src       = options.src || 'data-src'
  const srcset    = options.srcset || 'data-srcset'
  const threshold = options.threshold || 0
  const callback  = options.callback

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

    const offset = (threshold * 100) / winHeight

    return nodeBot >= viewTop - offset
        && nodeTop <= viewBot + offset
  }

  // source helpers

  function setSource(node) {
    // TODO: abstract this
    // check for srcset support
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/srcset.js
    if('srcset' in document.createElement('img')) {
      return node.setAttribute('srcset', node.getAttribute('data-srcset'))
    }
  }

  // API

  function start() {
    window.addEventListener('scroll', requestScroll)
    window.addEventListener('resize', requestScroll)

    return this
  }

  function stop() {
    window.removeEventListener('scroll', requestScroll)
    window.removeEventListener('resize', requestScroll)

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
    elements = [...document.querySelectorAll(selector)]

    return this
  }
}
