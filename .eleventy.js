module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "md",
        "css",
        "njk"
      ]);
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPlugin( require('@11ty/eleventy-navigation') );
    eleventyConfig.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));
    return {
      passthroughFileCopy: true,
      dir: {
        input: 'src',
        output: 'build'
      }

    }
  }
