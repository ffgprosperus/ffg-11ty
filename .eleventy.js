const eleventyGoogleFonts = require("eleventy-google-fonts");
const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItCont = require('markdown-it-container');
const mapping = {};
const md = markdownIt({ linkify: true, html: true, breaks: true });
const util = require('util')
const mapUtils = require('./mapsTest.js')
const querystring = require('querystring');
const createMap = require('./createMapWithMarkers.js')
const fs = require('fs')

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksAsyncFilter('createMapsJson', function(businessInfo, callback) {
        mapUtils.lookupAddress(businessInfo.address).then(res => {
            console.log('Running')
            console.log(util.inspect(res))
            var newBusinessInfo = {}

            console.log(util.inspect(res.results[0].geometry.location))
            newBusinessInfo['latitude'] = res.results[0].geometry.location.lat
            newBusinessInfo['longitude'] = res.results[0].geometry.location.lng
            newBusinessInfo['address'] = businessInfo.address
            newBusinessInfo['email'] = businessInfo.businessEmail
            newBusinessInfo['mobile'] = businessInfo.businessPhone
            newBusinessInfo['name'] = businessInfo.businessName

            fs.writeFile('build/businessInfo.json', JSON.stringify(newBusinessInfo), (err) => {
                console.log('error writing')
                if(err) throw err;
            });
            res.results[0].geometry.location
            callback(null, null)
        });
    });
    eleventyConfig.addFilter('generateMap', obj => { 
        createMap.createMapWithMarkers(obj)
    });
    eleventyConfig.addFilter('dump', obj => {
      return util.inspect(obj)
    });
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
