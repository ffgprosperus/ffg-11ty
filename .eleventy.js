const eleventyGoogleFonts = require("eleventy-google-fonts");
const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItCont = require('markdown-it-container');
const mapping = {};
const md = markdownIt({ linkify: true, html: true, breaks: true });


module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "md",
        "css",
        "njk"
      ]);
    md.use(markdownItAttrs)
      .use(markdownItCont, '', {
        validate: () => true,
        render: (tokens, idx) => {
            if (tokens[idx].nesting === 1) {
                const classList = tokens[idx].info.trim()
                return `<div ${classList && `class="${classList}"`}>`;
            } else {
                return `</div>`;
            }
        },
        renderChild: (tokens, idx) => {
            if (tokens[idx].nesting === 2) {
                const classList = tokens[idx].info.trim()
                return `<div ${classList && `class="${classList}"`}>`;
            } else {
                return `</div>`;
            }
        }
      })
    eleventyConfig.setLibrary('md', md);
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('src/images');
    eleventyConfig.addPlugin( require('@11ty/eleventy-navigation') );
    eleventyConfig.addPlugin(eleventyGoogleFonts);
    eleventyConfig.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));
    eleventyConfig.addNunjucksShortcode("flex", require('./lib/shortcodes/flex.js'));
    return {
      passthroughFileCopy: true,
      dir: {
        input: 'src',
        output: 'build'
      }

    }
  }
