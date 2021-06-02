const eleventyGoogleFonts = require('eleventy-google-fonts');
const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItCont = require('markdown-it-container');
const mapping = {};
const md = markdownIt({ linkify: true, html: true, breaks: true });
const util = require('util');
const mapUtils = require('./mapUtils.js');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function (eleventyConfig) {
	function sortByOrder(values) {
		let vals = [...values]; // this *seems* to prevent collection mutation...
		return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
	}

	eleventyConfig.addNunjucksAsyncFilter('createMapsJson', function (businessCollection, callback) {
		promises = [];
		businessCollection.forEach((businessInfo) => {
			promises.push(mapUtils.lookupAddress(businessInfo.data));
		});

		Promise.all(promises).then((result) => {
			filteredResult = result.filter((el) => {
				return el != null;
			});
			console.log(filteredResult);
			fs.writeFile(
				path.join(process.env.FFG_BUILD_DIR || 'build', 'businessInfo.json'),
				JSON.stringify(filteredResult),
				(err) => {
					console.log('done writing');
					if (err) throw err;
					callback(null, null);
				}
			);
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
    eleventyConfig.addPassthroughCopy('src/sitemap.xml');
    eleventyConfig.addPassthroughCopy('src/robots.txt');
    eleventyConfig.addPlugin( require('@11ty/eleventy-navigation') );
    eleventyConfig.addPlugin(eleventyGoogleFonts);
    eleventyConfig.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));
    eleventyConfig.addNunjucksShortcode("flex", require('./lib/shortcodes/flex.js'));
    console.log('build dir: ' + (process.env.FFG_BUILD_DIR || 'build'));
	eleventyConfig.addFilter('sortByOrder', sortByOrder);
	eleventyConfig.addFilter('getVarsFromMd', (mdFile) => {
		let contents = fs.readFileSync(mdFile, function (err, data) {
			if (err) {
				console.log(err);
				return '';
			}
			return data;
		});
		return matter(contents)['data'];
	});
	eleventyConfig.addFilter('getRenderedContentFromMd', (mdFile) => {
		let contents = fs.readFileSync(mdFile, function (err, data) {
			if (err) {
				console.log(err);
				return '';
			}
			return data;
		});
		return md.render(matter(contents)['content']);
	});
	eleventyConfig.addFilter('generateMap', (obj) => {
		createMap.createMapWithMarkers(obj);
	});
	eleventyConfig.addFilter('dump', (obj) => {
		return util.inspect(obj);
	});
	eleventyConfig.addFilter('push', (target, key, value) => {
		target[key] = value;
	});
	eleventyConfig.setTemplateFormats(['md', 'css', 'njk']);
	md.use(markdownItAttrs).use(markdownItCont, '', {
		validate: () => true,
		render: (tokens, idx) => {
			if (tokens[idx].nesting === 1) {
				const classList = tokens[idx].info.trim();
				return `<div ${classList && `class="${classList}"`}>`;
			} else {
				return `</div>`;
			}
		},
		renderChild: (tokens, idx) => {
			if (tokens[idx].nesting === 2) {
				const classList = tokens[idx].info.trim();
				return `<div ${classList && `class="${classList}"`}>`;
			} else {
				return `</div>`;
			}
		},
	});
	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addPassthroughCopy('css');
	eleventyConfig.addPassthroughCopy('src/images');
	eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
	eleventyConfig.addPlugin(eleventyGoogleFonts);
	eleventyConfig.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));
	eleventyConfig.addNunjucksShortcode('flex', require('./lib/shortcodes/flex.js'));
	console.log('build dir: ' + (process.env.FFG_BUILD_DIR || 'build'));
	return {
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			output: process.env.FFG_BUILD_DIR || 'build',
		},
	};
};
