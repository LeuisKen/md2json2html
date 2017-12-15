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
    return toHTML(node);
}

/**
 * to html
 *
 * @desc 用于递归调用遍历 node 树
 * @param {Object} node markdown-json node
 * @return {string} html format string
 */
function toHTML(node) {
    if (node == null) {
        return;
    }

    // text node
    if (typeof node === 'string') {
        return node;
    }

    // Multiple children
    if (Array.isArray(node)) {
        return node.map(toHTML).join('');
    }

    const tagName = Object.keys(node)[0];
    const attr = transformAttr(node[tagName].attr);

    // void element don't have children
    if (isVoidElement(tagName)) {
        return `<${tagName}${attr}/>`;
    }

    const transformedChildren = toHTML(node[tagName].children);

    return ''
        + `<${tagName}${attr}>`
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
    if (attr == null) {
        return '';
    }

    return Object.keys(attr)
        .filter(key => !!attr[key])
        .reduce((cur, next) => `${cur} ${next}="${attr[next]}"`, '');
}

module.exports = json2html;
