var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');

var entryFiles = [
	{
		entryFolder : './client-src/',
		fileName : 'index.js'
	}
];

var bundleDevelopment = function(entryFile) {
	var src = entryFile.entryFolder + entryFile.fileName;

	return browserify({
		entries : src,
		debug : true
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

var bundleProduction = function(entryFile) {
	var src = entryFile.entryFolder + entryFile.fileName;

	return browserify({
		entries : src,
		debug : true
	})
	.bundle()
	.pipe(source(entryFile.fileName))
	.pipe(buffer())
	.pipe(uglify())
	.on('error', util.log)
	.pipe(gulp.dest('./public/builds/js'));	
}

var getBundleName = function() {
	var packageJson = require('./package.json');
	var version = packageJson.version;
	var name = packageJson.name;

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


gulp.task('build-styles', function() {

})

gulp.task('default', ['build-scripts-development']);