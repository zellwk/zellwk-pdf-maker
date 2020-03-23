const config = require('./_config')
const del = require('del')

const clean = (cb) => {
  return del([
    config.outputDir + '/**/*',
    config.inputDir + '/_data/rev.json',
    'pdf/**/*'
  ])
}

module.exports = clean
