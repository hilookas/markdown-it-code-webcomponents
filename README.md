# markdown-it-code-webcomponents

[中文指南](README.zh.md)

[markdown-it](https://github.com/markdown-it/markdown-it) plugin. Support the componentization of block code, inline code and fenced code. Make it more convenient to work with web frameworks like Vue to parse later.

## Install

`npm i markdown-it-code-webcomponents`

## API

```javascript
const md = require('markdown-it')()
  .use(require('markdown-it-code-webcomponents'), { tag: 'my-code' });
```

- `tag`: Tag name for componentization

Text following:

````text
`code here`

    code there
```js
code everywhere
```
```
hello world!
```
````

Will be converted to:

```html
<p><my-code inline="">code here</my-code></p>
<my-code>code there
</my-code>
<my-code lang="js">code everywhere
</my-code>
<my-code>hello world!
</my-code>
```

## Example

```javascript
const md = require('markdown-it')()
  .use(require('markdown-it-code-webcomponents'), { tag: 'my-code' });

console.dir(md.render('`code here`\n\n    code there\n```js\ncode everywhere\n```\n```\nhello world!\n```'));

/* output

<p><my-code inline="">code here</my-code></p>
<my-code>code there
</my-code>
<my-code lang="js">code everywhere
</my-code>
<my-code>hello world!
</my-code>

*/
```

More examples can be found in `test.js`.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, lookas