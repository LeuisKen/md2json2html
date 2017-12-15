/**
 * @file test
 * @author leuisken <leuisken@foxmail.com>
 * @desc 基础测试文件
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const cloneDeep = require('lodash/cloneDeep');
const Prism = require('node-prismjs');
const {markdown2json, json2html} = require('../src');

// 预期结果
const expectJsonRes = require('./test.json');
const expectHtmlRes = fs.readFileSync(__dirname + '/test.html', 'utf8');
const expectHighlighedHtmlRes = fs.readFileSync(__dirname + '/test-hl.html', 'utf8');
// 程序执行结果
const data = fs.readFileSync(__dirname + '/test.md', 'utf8');
const jsonRes = markdown2json(data);

describe('markdown to json test', () => {
    it('should process YAML as meta data', () => {
        assert.strictEqual(
            JSON.stringify(jsonRes.meta),
            JSON.stringify(expectJsonRes.meta)
        );
    });
    it('should process markdown as json object', () => {
        assert.strictEqual(
            JSON.stringify(jsonRes.content),
            JSON.stringify(expectJsonRes.content)
        );
    });
});

describe('json to html test', () => {
    it('should transform json to html string', () => {
        const htmlRes = json2html(cloneDeep(expectJsonRes.content));
        assert.strictEqual(
            htmlRes,
            expectHtmlRes
        );
    });

    it('highlight code using converter', () => {
        const htmlRes = json2html(cloneDeep(expectJsonRes.content), [hlConverter]);
        assert.strictEqual(
            htmlRes,
            expectHighlighedHtmlRes
        );
    });
});

/**
 * highlight code converter
 *
 * @param {Object} node markdown-json node
 * @return {Object} transformed markdown-json node, this will pass to next converter
 */
function hlConverter(node) {
    if (node == null || typeof node === 'string') {
        return node;
    }
    // Just transform the pre tag.
    const tagName = Object.keys(node)[0];
    if (tagName !== 'pre') {
        return node;
    }
    // highlight code using prismjs
    const lang = node[tagName].attr.lang;
    const code = node[tagName].children.code.children;
    const language = Prism.languages[lang] || Prism.languages.autoit;
    node[tagName].children.code.children = Prism.highlight(code, language);

    return node;
}
