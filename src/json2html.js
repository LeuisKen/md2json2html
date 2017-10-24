/**
 * @file json2html
 * @author leuisken <leuisken@foxmail.com>
 * @desc 将 json 转换为 html
 */

'use strict';

/**
 * json to html
 *
 * @param {Object} node markdown-json node
 * @return {string} html format string
 */
function json2html(node) {
    if (node === null || node === undefined) {
        return;
    }

    // text node
    if (typeof node === 'string') {
        return node;
    }

    // Multiple children
    if (Array.isArray(node)) {
        return node.map(json2html).reduce((cur, next) => cur + next);
    }

    const tagName = Object.keys(node)[0];
    const attr = transformAttr(node[tagName].attr);

    // void element don't have children
    if (isVoidElement(tagName)) {
        return `<${tagName} ${attr}/>`;
    }

    const transformedChildren = json2html(node[tagName].children);

    return ''
        + `<${tagName} ${attr}>`
            + `${transformedChildren}`
        + `</${tagName}>`;
}

/**
 * isVoidElement
 *
 * @param {string} tagName 标签名
 * @return {boolean}
 */
function isVoidElement(tagName) {
    return tagName === 'img'
        || tagName === 'hr'
        || tagName === 'br';
}

/**
 * transformAttr
 *
 * @param {Object} attr 属性对象
 * @return {string} html 所用的属性格式字符串
 */
function transformAttr(attr) {
    if (attr === null || attr === undefined) {
        return '';
    }

    return Object.keys(attr)
        .filter(key => !!attr[key])
        .reduce((cur, next) => `${cur} ${next}="${attr[next]}"`, '');
}

module.exports = json2html;
