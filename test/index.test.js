/**
 * @file test
 * @author leuisken <leuisken@foxmail.com>
 * @desc 基础测试文件
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const {markdown2json, json2html} = require('../src');

const expectJsonRes = require('./test.json');
const expectHtmlRes = fs.readFileSync(__dirname + '/test.html', 'utf8');

const data = fs.readFileSync(__dirname + '/test.md', 'utf8');
const jsonRes = markdown2json(data);
const htmlRes = json2html(expectJsonRes.content);

describe('mardown to json test', () => {
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
        assert.strictEqual(
            htmlRes,
            expectHtmlRes
        );
    });
});
