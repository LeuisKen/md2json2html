/**
 * @file transformer
 * @author leuisken <leuisken@foxmail.com>
 * @desc 解析 markdown ast 为 json 对象
 */

'use strict';

let isTHead = false;

function transformTHead(node) {
    const transformedNode = transformer(node);
    isTHead = false;
    return transformedNode;
}

function transformer(node) {
    if (node === null || node === undefined) {
        return;
    }

    if (Array.isArray(node)) {
        return node.map(transformer);
    }

    const transformedChildren = node.type === 'table'
        ? transformer(node.children.slice(1))   // if table, remove the first children as thead
        : transformer(node.children);

    const structure = (type, children = transformedChildren) => ({
        [type]: {
            children
        }
    });

    switch (node.type) {
        case 'root':
            return structure('article');
        case 'heading':
            return structure(`h${node.depth}`);
        case 'text':
            return node.value;
        case 'list':
            return structure(node.ordered ? 'ol' : 'ul');
        case 'listItem':
            return structure('li');
        case 'paragraph':
            return structure('p');
        case 'link':
            return {
                a: {
                    attr: {
                        title: node.title,
                        href: node.url
                    },
                    children: transformedChildren
                }
            };
        case 'image':
            return {
                img: {
                    attr: {
                        title: node.title,
                        src: node.url,
                        alt: node.alt
                    }
                }
            };
        case 'table':
            isTHead = true;
            return {
                table: {
                    children: [
                        {
                            thead: {
                                children: transformTHead(node.children[0])
                            }
                        },
                        {
                            tbody: {
                                children: transformedChildren
                            }
                        }
                    ]
                }
            };
        case 'tableRow':
            return structure('tr');
        case 'tableCell':
            return structure(isTHead ? 'th' : 'td');
        case 'emphasis':
            return structure('em');
        case 'strong':
            return structure('strong');
        case 'inlineCode':
            return structure('code');
        case 'code':
            return {
                pre: {
                    attr: {
                        lang: node.lang
                    },
                    children: {
                        code: {
                            children: node.value
                        }
                    }
                }
            };
        case 'blockquote':
            return structure('blockquote');
        case 'break':
            return structure('br');
        case 'thematicBreak':
            return structure('hr');
        case 'linkReference':
            return structure('span');
        default:
            return node;
    }
}

module.exports = transformer;