const path = require('path')
const datefns = require('date-fns')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdown = require('./eleventy/markdown')
const { inputDir, outputDir } = require('./gulp/_config')


module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addLayoutAlias('post', '_layout/post')

  // Markdown
  eleventyConfig.setLibrary('md', markdown.lib)
  eleventyConfig.addFilter('markdown', markdown.inline)
  eleventyConfig.addPairedShortcode('markdown', markdown.pairedMarkdown)
  eleventyConfig.addPairedShortcode('markdownNoTrim', markdown.markdownNoTrim)
  eleventyConfig.addFilter('decode', markdown.decode)

  // Pages
  // Override permalink to remove /page prefix
  eleventyConfig.addFilter('pagePathOverride', content => {
    const regex = /page\/(.*).njk/
    const match = content.match(regex)
    return match[1]
  })

  // Posts
  // Create a post collection for all articles inside `/post` folder
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md')
  })

  // Excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- more -->"
  });

  // Dates
  eleventyConfig.addFilter('readableDate', value => {
    return datefns.format(value, 'do MMM yyyy')
  })

  eleventyConfig.addFilter('htmlDateString', value => {
    return datefns.format(value, 'yyyy-MM-dd')
  })

  return {
    dir: {
      input: inputDir,
      output: outputDir,
      includes: '_includes'
    },
    templateFormats: ['njk', 'md'],
    passthroughFileCopy: true
  }
}
