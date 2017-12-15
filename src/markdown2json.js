/**
 * @file markdown2json
 * @author leuisken <leuisken@foxmail.com>
 * @desc 解析 markdown 文件为 json 对象
 */

'use strict';

const jsYaml = require('js-yaml');
const remark = require('remark');

const mdParser = require('./markdown-parser');

/**
 * markdown to json
 *
 * @param {string} markdownData markdown data string
 * @return {Object} json object that contents yaml format meta and markdown-json node
 */
function markdown2json(markdownData) {
    // 拆分数据
    const {yaml, md} = groupDataString(markdownData);
    // 解析 yaml 头，作为 json 的 meta 字段
    const meta = jsYaml.load(yaml);
    // 解析 markdown 数据为 ast
    const ast = remark().parse(md);
    // 解析 markdown ast
    const content = mdParser(ast);

    return {
        meta,           // yaml 头信息
        content         // 格式化成 json 格式的 markdown 数据
    };
}

/**
 * group data string as yaml and markdown
 *
 * @param {string} str input data string
 * @return {Object} grouped yaml and markdown data string
 */
function groupDataString(str) {
    const re = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;
    const results = re.exec(str);
    return {
        yaml: results[2] ? results[2] : '',
        md: results[3] ? results[3] : ''
    };
}

module.exports = markdown2json;
