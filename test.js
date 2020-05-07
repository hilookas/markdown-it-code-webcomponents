'use strict';

const MarkdownIt = require('markdown-it');
const componentizedCodePlugin = require('.');

function assert(condition) {
  if (!condition) {
    throw new Error();
  }
}

function test() {
  for (const case_ of cases) {
    case_[1]()
  }
  console.info('OK.')
}

const cases = [
  [ 'case1', () => {
    const md = (new MarkdownIt())
      .use(componentizedCodePlugin, { tag: 'my-code' });

    // should works well
    assert(
      md.render('`code here`\n\n    code there\n```js\ncode everywhere\n```\n```\nhello world!\n```')
      ===
      '<p><my-code inline="">code here</my-code></p>\n' +
      '<my-code>code there\n' +
      '</my-code>\n' +
      '<my-code lang="js">code everywhere\n' +
      '</my-code>\n' +
      '<my-code>hello world!\n' +
      '</my-code>\n'
    );
  } ],
];

test();
