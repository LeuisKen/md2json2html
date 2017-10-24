/**
 * @file markdown2json
 * @author leuisken <leuisken@foxmail.com>
 * @desc 解析 markdown 文件为 json 对象
 */

'use strict';

const YMF = require('yaml-front-matter');
const remark = require('remark');

const transformer = require('./transformer');

/**
 * markdown to json
 *
 * @param {string} markdownData markdown data string
 * @return {Object} json object that contents yaml format meta and markdown-json node
 */
function markdown2json(markdownData) {
    // 解析 yaml 头，作为 json 的 meta 字段
    let meta = YMF.loadFront(markdownData);
    // 解析 markdown 数据为 ast
    let ast = remark().parse(meta.__content);
    // 解析 markdown ast
    let content = transformer(ast);
    // 删去多余的 markdown 源
    delete meta.__content;

    return {
        meta: meta,         // yaml 头信息
        content: content    // 格式化成 json 格式的 markdown 数据
    };
}

module.exports = markdown2json;
