'use strict';

const { unescapeAll, escapeHtml } = require('markdown-it/lib/common/utils');

function inlineCodeRule(tag, tokens, idx, options, env, slf) {
  const token = tokens[idx];

  const i = token.attrIndex('inline');
  const tmpAttrs = token.attrs ? token.attrs.slice() : [];
  if (i < 0) tmpAttrs.push([ 'inline', '' ]);
  const tmpToken = {
    attrs: tmpAttrs
  };

  return '<' + tag + slf.renderAttrs(tmpToken) + '>'
       + escapeHtml(tokens[idx].content)
       + '</' + tag + '>';
}

function blockCodeRule(tag, tokens, idx, options, env, slf) {
  const token = tokens[idx];

  return '<' + tag + slf.renderAttrs(token) + '>'
       + escapeHtml(tokens[idx].content)
       + '</' + tag + '>\n';
}

function fencedBlockCodeRule(tag, tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const lang = (token.info ? unescapeAll(token.info).trim() : '').split(/\s+/g)[0];
  const content = escapeHtml(token.content);

  let tmpToken = token;
  if (lang) {
    const i = token.attrIndex('lang');
    const tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push([ 'lang', lang ]);
    } else {
      tmpAttrs[i][1] = lang;
    }

    // Fake token just to render attributes
    tmpToken = {
      attrs: tmpAttrs
    };
  }

  return '<' + tag + slf.renderAttrs(tmpToken) + '>'
       + content
       + '</' + tag + '>\n';
}

function load(md, options) {
  options = options || {};
  const tag = options.tag || 'code';
  md.renderer.rules.code_inline = (...args) => inlineCodeRule(tag, ...args);
  md.renderer.rules.code_block = (...args) => blockCodeRule(tag, ...args);
  md.renderer.rules.fence = (...args) => fencedBlockCodeRule(tag, ...args);
}

module.exports = load;
