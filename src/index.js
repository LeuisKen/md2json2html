/**
 * @file index
 * @author leuisken <leuisken@foxmail.com>
 * @desc just an entry file
 */

'use strict';

const markdown2json = require('./markdown2json');
const json2html = require('./json2html');

module.exports = {
    markdown2json: markdown2json,
    json2html: json2html
};
