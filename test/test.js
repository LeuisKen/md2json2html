/**
 * @file test
 * @author leuisken <leuisken@foxmail.com>
 * @desc 简易测试文件
 */

'use strict';

const fs = require('fs');

const main = require('../src/index');
const markdown2json = main.markdown2json;
const json2html = main.json2html;

const data = fs.readFileSync(__dirname + '/test.md', 'utf8');

const jsonRes = markdown2json(data);
const htmlRes = json2html(jsonRes.content);

console.log(JSON.stringify(jsonRes, null, 4));

console.log(htmlRes);
