const fileswatch   = 'html,htm,txt,json,md,woff2';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const bssi         = require('browsersync-ssi');
const sass         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const rename       = require('gulp-rename');
const postcss    = require('gulp-postcss')

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/',
			middleware: bssi({ baseDir: 'app/', ext: '.html' })
		},
		notify: false,
	})
}

function styles() {
	return src(['app/styles/sass/**/*.scss', '!app/styles/sass/**/_*.scss'])
		.pipe(sass())
		.pipe(postcss([ autoprefixer({ overrideBrowserslist: ['last 10 versions'] }) ]))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } },}))
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest('app/styles'))
		.pipe(browserSync.stream())
}

function startwatch() {
	watch('app/styles/sass/**/*', { usePolling: true }, styles)
	watch(`app/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
}

exports.default = series(styles, parallel(browsersync, startwatch))
