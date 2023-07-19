import React from 'react';

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
    const cs = React.useState(initial_value);
    const [controller,] = React.useState(() => initHandler(cs, fun));
    controller.state = cs[0];
    return [controller.state, controller];
}

export { Controller, useController };
