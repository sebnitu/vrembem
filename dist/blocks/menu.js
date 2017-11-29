'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuLink = exports.MenuSep = exports.MenuItem = exports.Menu = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  margin: 0;\n  padding: 0;\n  font-size: 1em;\n  list-style: none;\n'], ['\n  display: flex;\n  align-items: center;\n  margin: 0;\n  padding: 0;\n  font-size: 1em;\n  list-style: none;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  margin: 0;\n\n  + * {\n    margin-left: 0.5em;\n  }\n'], ['\n  margin: 0;\n\n  + * {\n    margin-left: 0.5em;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  align-self: stretch;\n  margin: 0 1em;\n  border-right: 1px solid rgba(0,0,0, 0.1);\n'], ['\n  align-self: stretch;\n  margin: 0 1em;\n  border-right: 1px solid rgba(0,0,0, 0.1);\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  position: relative;\n  display: flex;\n  align-items: center;\n  border: none;\n  padding: 0.375em 0.75em;\n  color: #303030;\n  white-space: nowrap;\n  text-decoration: none;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 3px;\n\n  &:hover,\n  &:focus {\n    outline: none;\n    color: #303030;\n    background: rgba(0,0,0, 0.05);\n    border-color: transparent;\n  }\n'], ['\n  cursor: pointer;\n  position: relative;\n  display: flex;\n  align-items: center;\n  border: none;\n  padding: 0.375em 0.75em;\n  color: #303030;\n  white-space: nowrap;\n  text-decoration: none;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 3px;\n\n  &:hover,\n  &:focus {\n    outline: none;\n    color: #303030;\n    background: rgba(0,0,0, 0.05);\n    border-color: transparent;\n  }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Menu = exports.Menu = _styledComponents2.default.ul(_templateObject);

var MenuItem = exports.MenuItem = _styledComponents2.default.li(_templateObject2);

var MenuSep = exports.MenuSep = _styledComponents2.default.li(_templateObject3);

var MenuLink = exports.MenuLink = _styledComponents2.default.a(_templateObject4);