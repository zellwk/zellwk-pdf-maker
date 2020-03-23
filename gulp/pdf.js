const glob = require('glob-promise')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const config = require('./_config')

// Downlaod wkhtmltopdf
// https://wkhtmltopdf.org/downloads.html

function wkhtmltopdfCommand (file) {
  return `wkhtmltopdf \
    --margin-top 0mm \
    --margin-bottom 0mm \
    --margin-left 0mm \
    --margin-right 0mm \
    ${input(file)} ${output(file)}`

  function input (file) {
    const result = file.split('dist/')[1]
    return `http://localhost:3000/${result}`
  }

  function output (file) {
    const regex = new RegExp(/post\/(.*)\/index\.html$/)
    const result = file.match(regex)[1]
    return `pdf/${result}.pdf`
  }
}

async function pdf () {
  const files = await glob('dist/post/**/index.html')

  for (const file of files) {
    try {
      const { stdout, stderr } = await exec(wkhtmltopdfCommand(file))
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = pdf
