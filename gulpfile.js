const fileswatch   = 'html,htm,txt,json,md,woff2';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require('gulp-rename');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'src/',
		},
		port: 3000,
		notify: false,
	})
}

function styles() {
	return src(['src/styles/sass/**/*.scss', '!src/styles/sass/**/_*.scss'])
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } },}))
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest('src/styles'))
		.pipe(browserSync.stream())
}

function startwatch() {
	watch('src/styles/sass/**/*', { usePolling: true }, styles)
	watch(`src/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
}

exports.default = series(styles, parallel(browsersync, startwatch))
