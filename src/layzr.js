import knot from 'knot.js'

export default (options = {}) => {
  // options

  const settings = {
    selector: options.selector || '[data-layzr]',
    normal: options.normal || 'data-normal',
    retina: options.retina || 'data-retina',
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

  // device pixel ratio
  // not supported in IE10 - https://msdn.microsoft.com/en-us/library/dn265030(v=vs.85).aspx

  const dpr = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI

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

  // source helper
  // use srcset if available, otherwise fallback to pixel density

  function setSource(node) {
    if(srcset && node.hasAttribute(settings.srcset)) {
      node.setAttribute('srcset', node.getAttribute(settings.srcset))
    }
    else {
      const retina = dpr > 1 && node.getAttribute(settings.retina)
      node.setAttribute('src', retina || node.getAttribute(settings.normal))
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
