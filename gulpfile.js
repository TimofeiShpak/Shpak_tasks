const watchFiles = 'html,htm,txt,json,md,woff2';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const del = require('del');

function browserSyncInit() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
		},
		port: 3000,
		notify: false,
	})
}

function styles() {
	return src(['src/sass/**/*.scss', '!src/sass/**/_*.scss'])
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } }, }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
}

function cleanDist() {
	return del('dist/**/*', { force: true })
}

function buildCopy() {
	cleanDist();
	styles();
	return src([
		'src/index.html',
		'src/assets/**/*'
	], { base: 'src/' })
		.pipe(dest('dist'))
}

function startWatch() {
	watch('src/sass/**/*', { usePolling: true }, styles)
	watch(['src/index.html','src/assets/**/*'], { usePolling: true }, buildCopy)
	watch(`src/**/*.{${watchFiles}}`, { usePolling: true }).on('change', browserSync.reload)
}

exports.watch = startWatch;
exports.build = series(cleanDist, styles, buildCopy);
exports.default = series(cleanDist, buildCopy, styles, parallel(browserSyncInit, startWatch));
