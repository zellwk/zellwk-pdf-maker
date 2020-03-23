const { src, dest } = require('gulp')
const config = require('./_config')

const copyFontsToDist = _ => {
  return src(config.inputDir + '/fonts/**/*')
    .pipe(dest(config.outputDir))
}

const images = copyFontsToDist

module.exports = images
