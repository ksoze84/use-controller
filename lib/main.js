'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

class Controller {
    constructor(hs) {
        this.setState = hs[1];
    }
}
function initHandler(hs, fun) {
    const controller = new Controller(hs);
    if (hs[0])
        controller.state = hs[0];
    if (fun)
        Object.assign(controller, fun(controller));
    return controller;
}
function useController(fun, initial_value) {
    const cs = React__default['default'].useState(initial_value);
    const [controller,] = React__default['default'].useState(() => initHandler(cs, fun));
    controller.state = cs[0];
    return [controller.state, controller];
}

exports.Controller = Controller;
exports.useController = useController;
