import knot from 'knot.js'

export default (options = {}) => {
  // cache

  let prevLoc
  let ticking

  // options

  const selector   = options.selector || '[data-layzr]'
  const attr       = options.attr || 'data-layzr'
  const attrRetina = options.attrRetina || 'data-layzr-retina'
  const attrBg     = options.attrBg || 'data-layzr-bg'
  const threshold  = options.threshold || 0
  const callback   = options.callback

  // instance

  const instance = knot({

  })

  return instance

  // debounce helpers

  function requestScroll() {
    prevLoc = window.scrollY || window.pageYOffset
    requestFrame()
  }

  function requestFrame() {
    if(!ticking) {
      requestAnimationFrame(() => update())
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

}
