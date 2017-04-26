const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');
const babel = require('gulp-babel');
const stringify = require('stringify');

const entryFiles = [
  {
    entryFolder : './client-src/',
    fileName : 'index.js'
  },
  {
   entryFolder : './client-src/',
   fileName : 'board-desktop.js'
  },
  {
   entryFolder : './client-src/',
   fileName : 'board-mobile.js'
  },
  {
    entryFolder : './client-src/',
    fileName : 'index-mobile.js'
  }
];

const bundleDevelopment = function(entryFile) {
  const src = entryFile.entryFolder + entryFile.fileName;

  return browserify({
    entries : src,
    debug : true
  })
  .transform("babelify", {presets: ["es2015"]})
  .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] }
  })
  .bundle()
  .pipe(source(entryFile.fileName))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps : true
  }))
  .pipe(uglify())
  .on('error', util.log)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/builds/js'));
}

const bundleProduction = function(entryFile) {
  const src = entryFile.entryFolder + entryFile.fileName;

  return browserify({
    entries : src,
    debug : true
  })
  .transform("babelify", {presets: ["es2015"]})
  .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] }
  })
  .bundle()
  .pipe(source(entryFile.fileName))
  .pipe(buffer())
  .pipe(uglify())
  .on('error', util.log)
  .pipe(gulp.dest('./public/builds/js')); 
}

const getBundleName = function() {
  const packageJson = require('./package.json');
  const version = packageJson.version;
  const name = packageJson.name;

  return version + '.' + name + '.' + 'min';
}

gulp.task('build-scripts-development', function() {
  entryFiles.forEach(function(entryFile) {
    bundleDevelopment(entryFile)
  })
})

gulp.task('build-scripts-production', function() {
  entryFiles.forEach(function(entryFile) {
    bundleProduction(entryFile)
  })
})

gulp.task('copy-css', function() {
  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap.native/assets/css/bootstrap.min.css',
    './node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
    './client-src/lib-styles/grab-to-pan.css',
    './node_modules/nprogress/nprogress.css',
    './node_modules/alertifyjs/build/css/alertify.min.css',
    './node_modules/alertifyjs/build/css/themes/bootstrap.rtl.css',
    './node_modules/@pirxpilot/tags-input/tags-input.css',
    //'./node_modules/taggle/example/css/taggle.css',
    './client-src/lib-styles/smt-bootstrap.css',
    './client-src/images/circle-loading.gif'
  ])
  .pipe(gulp.dest('./public/builds/css'))
})

gulp.task('copy-fonts', function() {
  gulp.src([
    './node_modules/bootstrap/dist/fonts/*.*'
  ])
  .pipe(gulp.dest('./public/builds/fonts'))
})

gulp.task('build-styles', function() {

})

gulp.task('default', ['build-scripts-development']);
gulp.task('copy-assets', ['copy-css', 'copy-fonts']);
