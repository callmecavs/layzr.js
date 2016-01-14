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

    const threshold = (threshold * 100) / winHeight
  }

  // source helpers

  function getSource(node) {
    // check for srcset support
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/srcset.js
    if('srcset' in createElement('img')) {
      return node.getAttribute('data-srcset')
    }


    // const source = node.currentSrc ||
    // return node.currentSrc ||

    // IE10 doesn't support devicePixelRatio :facepalm:
    // https://msdn.microsoft.com/en-us/library/dn265030(v=vs.85).aspx
    // const dpr = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI

    // const attribute = dpr > 1
    //   ? node.hasAttribute(attrRetina) ? attrRetina : attr
    //   : attr
  }

  // function setSource(node) {
  //   const source = getSource(node)
  //
  //   node.hasAttribute(attrBg)
  //     ? node.style.backgroundImage = `url("${ source }")`
  //     : node.setAttribute('src', source)
  //
  //   ;[attr, attrRetina, attrBg].forEach(attr => node.removeAttribute(attr))
  //
  //   instance.emit('set', node)
  // }

  // API

  function start() {
    window.addEventListener('scroll', requestScroll)
    window.addEventListener('resize', requestScroll)
  }

  function stop() {
    window.removeEventListener('scroll', requestScroll)
    window.removeEventListener('resize', requestScroll)
  }

  function check() {
    elements.forEach(element => {
      // inViewport(element) && setSource(element)
    })

    ticking = false
  }

  function update() {
    elements = [...document.querySelectorAll(selector)]
  }
}
