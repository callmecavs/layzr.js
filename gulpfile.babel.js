// IMPORTS

import babelify from 'babelify'
import sync from 'browser-sync'
import browserify from 'browserify'
import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import changed from 'gulp-changed'
import nano from 'gulp-cssnano'
import fileinclude from 'gulp-file-include'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import assign from 'lodash.assign'
import notifier from 'node-notifier'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import watchify from 'watchify'

// ERROR HANDLER

const onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  })

  console.log(error)
  this.emit('end')
}

// HTML

gulp.task('html', () => {
  return gulp.src('src/html/**/*.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(fileinclude({ prefix: '@', basepath: './' }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./'))
})

// SASS

gulp.task('sass', () => {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({ browsers: [ 'last 2 versions', 'ie >= 9', 'Android >= 4.1' ] }))
    .pipe(nano({ safe: true }))
    .pipe(sourcemaps.write('./maps', { addComment: false }))
    .pipe(gulp.dest('./'))
})

// JS

const browserifyArgs = {
  entries: 'src/js/main.js',
  debug: true,
  transform: [ 'babelify' ]
}

const watchifyArgs = assign(watchify.args, browserifyArgs)
const bundler = watchify(browserify(watchifyArgs))

const build = () => {
  console.log('Bundling started...')
  console.time('Bundling finished')

  return bundler
    .bundle()
    .on('error', onError)
    .on('end', () => console.timeEnd('Bundling finished'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps', { addComment: false }))
    .pipe(gulp.dest('./'))
    .pipe(sync.stream())
}

bundler.on('update', build)
gulp.task('js', build)

// IMAGES

gulp.task('images', () => {
  return gulp.src('src/images/**/*.{gif,jpg,png,svg}')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('./'))
    .pipe(imagemin({ progressive: true, interlaced: true }))
    .pipe(gulp.dest('./images'))
})

// VIDEOS, FONTS, FAVICON

const inputs = [
  '/videos/**/*',
  '/fonts/**/*.{eot,svg,ttf,woff,woff2}',
  '/favicon.ico'
]

const outputs = [
  '/videos',
  '/fonts',
  ''
]

;['videos', 'fonts', 'favicon'].forEach((name, index) => {
  gulp.task(name, () => {
    return gulp.src('src' + inputs[index])
      .pipe(plumber({ errorHandler: onError }))
      .pipe(gulp.dest('./' + outputs[index]))
  })
})

// SERVER

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
    baseDir: './',
    middleware: [
      sendMaps
    ]
  },
  watchOptions: {
    ignored: '*.map'
  }
}

gulp.task('server', () => sync(options))

// WATCH

gulp.task('watch', () => {
  gulp.watch('src/html/**/*.html', ['html', reload])
  gulp.watch('src/sass/**/*.scss', ['sass', reload])
  gulp.watch('src/images/**/*.{gif,jpg,png,svg}', ['images', reload])
})

// BUILD & DEFAULT TASK

gulp.task('build', ['html', 'sass', 'js', 'images', 'videos', 'fonts', 'favicon'])
gulp.task('default', ['server', 'build', 'watch'])
