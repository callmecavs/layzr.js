// imports

const json     = require('./package.json')
const sync     = require('browser-sync')
const del      = require('del')
const fs       = require('fs')
const gulp     = require('gulp')
const notifier = require('node-notifier')
const rollup   = require('rollup')
const babel    = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve  = require('rollup-plugin-node-resolve')
const uglify   = require('rollup-plugin-uglify')

// error handler

const onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  })

  console.log(error)
  this.emit('end')
}

// clean

gulp.task('clean', () => del('dist'))

// attribution

const attribution =
`/*!
 * Layzr.js ${ json.version } - ${ json.description }
 * Copyright (c) ${ new Date().getFullYear() } ${ json.author } - ${ json.homepage }
 * License: ${ json.license }
 */
`

// js

const read = {
  entry: 'src/layzr.js',
  sourceMap: true,
  plugins: [
    resolve({ jsnext: true }),
    babel(),
    uglify()
  ]
}

const write = {
  format: 'umd',
  exports: 'default',
  moduleName: 'Layzr',
  sourceMap: true
}

gulp.task('js', () => {
  return rollup
    .rollup(read)
    .then(bundle => {
      // generate the bundle
      const files = bundle.generate(write)

      // cache path to JS dist file
      const dist = 'dist/layzr.min.js'

      // write the attribution
      fs.writeFileSync(dist, attribution)

      // write the JS and sourcemap
      fs.appendFileSync(dist, files.code)
      fs.writeFileSync('dist/maps/layzr.js.map', files.map.toString())
    })
})

// server

const server = sync.create()
const reload = sync.reload

const sendMaps = (req, res, next) => {
  const filename = req.url.split('/').pop()
  const extension = filename.split('.').pop()

  if(extension === 'css' || extension === 'js') {
    res.setHeader('X-SourceMap', '/maps/' + filename + '.map')
  }

  return next()
}

const options = {
  notify: false,
  server: {
    baseDir: 'dist',
    middleware: [
      sendMaps
    ]
  },
  watchOptions: {
    ignored: '*.map'
  }
}

gulp.task('server', () => sync(options))

// watch

gulp.task('watch', () => {
  gulp.watch('src/layzr.js', ['js', reload])
})

// build and default tasks

gulp.task('build', ['clean'], () => {
  // create dist directories
  fs.mkdirSync('dist')
  fs.mkdirSync('dist/maps')

  // run the tasks
  gulp.start('js')
})

gulp.task('default', ['build', 'server', 'watch'])
