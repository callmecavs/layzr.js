import knot from 'knot.js'

export default (options = {}) => {
  let prevLoc
  let ticking

  // options
  const container  = document.querySelector(options.container) || window
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
}
