/**
 * @file json2html
 * @author leuisken <leuisken@foxmail.com>
 * @desc 将 json 转换为 html
 */

'use strict';

function json2html(node) {
    if (node === null || node === undefined) {
        return;
    }

    if (typeof node === 'string') {
        return node;
    }

    if (Array.isArray(node)) {
        return node.map(json2html).reduce((cur, next) => cur + next);
    }

    const tagName = Object.keys(node)[0];
    const attr = transformedAttr(node[tagName].attr);

    if (isVoidElement(tagName)) {
        return `<${tagName} ${attr}/>`;
    }

    const transformedChildren = json2html(node[tagName].children);

    return ''
        + `<${tagName} ${attr}>`
            + `${transformedChildren}`
        + `</${tagName}>`;
}

function isVoidElement(tagName) {
    return tagName === 'img'
        || tagName === 'hr'
        || tagName === 'br';
}

function transformedAttr(attr) {
    if (attr === null || attr === undefined) {
        return '';
    }

    return Object.keys(attr)
        .filter(key => !!attr[key])
        .reduce((cur, next) => `${cur} ${next}="${attr[next]}"`, '');
}

module.exports = json2html;
