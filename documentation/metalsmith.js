const collections = require('metalsmith-collections')
const faker = require('faker')
const fs = require('fs')
const markdown = require('metalsmith-markdown')
const marked = require('marked')
const metalsmith = require('metalsmith')
const mPrism = require('metalsmith-prism')
const prism = require('prismjs')
const twig = require('metalsmith-twig')
const yaml = require('js-yaml')

var m = yaml.safeLoad(fs.readFileSync('metalsmith.yml', 'utf-8'))

if (typeof m.collections === 'undefined') {
  m.collections = {}
}

m.twig.global = {
  faker: faker,
  marked: marked,
  prism: {
    highlight: prism.highlight,
    languages: prism.languages
  }
}

metalsmith(__dirname)
  .metadata(m.metadata)
  .source(m.source)
  .destination(m.destination)
  .clean(m.clean)
  .use(collections(m.collections))
  .use(markdown(m.markdown))
  .use(mPrism())
  .use(twig(m.twig))
  .build(function (err) {
    if (err) throw err
    console.log('Metalsmith done successfully.')
  })
