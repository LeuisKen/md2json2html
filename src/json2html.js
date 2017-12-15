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
    return walk(node, toHTML);
}

/**
 * walk
 *
 * @desc 用于递归遍历节点，并执行节点处理函数 func
 * @param {Object} node markdown-json node
 * @param {Function} func 节点处理函数
 * @return {any} transformed node
 */
function walk(node, func) {

    // Multiple children
    if (Array.isArray(node)) {
        return node.map(el => walk(el, func));
    }

    if (node == null || typeof node === 'string') {
        node = func(node);
        return node;
    }

    const tagName = Object.keys(node)[0];
    const childrenNode = walk(node[tagName].children, func);
    node[tagName].children = childrenNode;

    node = func(node);

    return node;
}

/**
 * to html
 *
 * @desc transform markdown-json node to html format string
 * @param {Object} node markdown-json node
 * @return {string} html format string
 */
function toHTML(node) {
    if (node == null) {
        return '';
    }

    // text node
    if (typeof node === 'string') {
        return node;
    }

    const tagName = Object.keys(node)[0];
    const attr = transformAttr(node[tagName].attr);

    // void element don't have children
    if (isVoidElement(tagName)) {
        return `<${tagName}${attr}/>`;
    }

    const transformedChildren = (() => {
        if (Array.isArray(node[tagName].children)) {
            return node[tagName].children.join('');
        }
        return node[tagName].children;
    })();

    return ''
        + `<${tagName}${attr}>`
            + transformedChildren
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
