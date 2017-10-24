# md2json2html

A npm package that transform markdown data to json and html.

## Usage:

### Install:

```sh
npm i md2json2html
```

### Example:

See the [test](./test/test.js) file.

```js
const fs = require('fs');

const main = require('md2json2html');
const markdown2json = main.markdown2json;
const json2html = main.json2html;

const data = fs.readFileSync(__dirname + '/test.md', 'utf8');

const jsonRes = markdown2json(data);
const htmlRes = json2html(jsonRes.content);

console.log(JSON.stringify(jsonRes, null, 4));

console.log(htmlRes);
```

## API:

### markdown2json

```js
/**
 * markdown to json
 *
 * @param {string} markdownData markdown data string
 * @return {Object} json object that contents yaml format meta and markdown-json node
 */
```

Note: the markdown-json node is defined as following:

```js
class Node {
    constructor(tagName, attr, children) {
        this.tagName = {
            attr,
            children
        }
    }
}
// example:
// Node {
//     ul: {
//         attr: {
//             // key-value pairs for ul
//         },
//         children: Node or Array of Node
//     }
// }
```

### json2html

```js
/**
 * json to html
 *
 * @param {Object} node markdown-json node
 * @return {string} html format string
 */
```

Thanks to [mark-twain](https://github.com/benjycui/mark-twain).
