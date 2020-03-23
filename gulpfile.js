require('dotenv').config({ path: 'secrets/variables.env' })
const { series, parallel } = require('gulp')
const clean = require('./gulp/clean')
const eleventy = require('./gulp/eleventy')
const sass = require('./gulp/sass')
const images = require('./gulp/images')
const fonts = require('./gulp/fonts')
const watch = require('./gulp/watch')
const { browserSync } = require('./gulp/browser-sync')
const pdf = require('./gulp/pdf')
const { jsDevelopment, jsProduction } = require('./gulp/rollup')

exports.clean = clean
exports.eleventy = eleventy
exports.sass = sass
exports.images = images
exports.serve = browserSync
exports.pdf = pdf
exports.jsdev = jsDevelopment
exports.jsprod = jsProduction

exports.default = series(
  clean,
  parallel(sass, eleventy, images, fonts),
  parallel(jsDevelopment, browserSync, watch)
)

exports.build = series(
  clean,
  parallel(sass, images, fonts, jsProduction),
  eleventy,
  pdf
)
