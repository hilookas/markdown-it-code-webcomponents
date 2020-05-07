# markdown-it-code-webcomponents

[markdown-it](https://github.com/markdown-it/markdown-it) 解析器的插件，支持将 block code，inline code，fenced code 组件化。便于之后使用 Vue 等框架解析。

## 安装

`npm i markdown-it-code-webcomponents`

## API

```javascript
const md = require('markdown-it')()
  .use(require('markdown-it-code-webcomponents'), { tag: 'my-code' });
```

- `tag`：组件化后的标签名称

以下内容：

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

该插件会转换为：

```html
<p><my-code inline="">code here</my-code></p>
<my-code>code there
</my-code>
<my-code lang="js">code everywhere
</my-code>
<my-code>hello world!
</my-code>
```

## 样例

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

更多样例可以参见 `test.js` 文件。

## 协议

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, lookas