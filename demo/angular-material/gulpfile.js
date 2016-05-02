/* jshint ignore:start */
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var rename = require("gulp-rename");

var appSrc = [
	'./src/js/app.js',
	'./src/js/common/**/*.js',
	'./src/js/ctrl/**/*.js',
	'./src/js/resource/**/*.js',
];

// Lint Task
gulp.task('lint', function() {
	'use strict';
	return gulp.src('javascript/*/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail', {
			ignoreWarning: true
		}));
});

// Compile Our Sass
gulp.task('compass', function() {
	'use strict';
	return gulp.src('./src/sass/**/*.sass')
		.pipe(compass({
			config_file: './src/sass/config.rb',
			css: './dist',
			sass: './src/sass/'
		}));
});

// Concatenate & Minify JS
gulp.task('concat', ['lint'], function() {
	'use strict';
	var app = gulp.src(appSrc)
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(concat('app_bundle.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(rename("app_bundle.min.js"))
		.pipe(sourcemaps.write('./', {
			addComment: true
		}))
		.pipe(gulp.dest('./dist'));

	return app;
});



// Watch Files For Changes
gulp.task('watch', function() {
	'use strict';
	gulp.watch('./src/js/**/*.js', ['concat']);
	gulp.watch('./src/sass/**/*.sass', ['compass']);
});

// Default Task
gulp.task('default', ['concat', 'compass']);