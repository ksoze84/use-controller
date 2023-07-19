import React from "react";
declare class Controller<T> {
    state?: T;
    readonly setState: React.Dispatch<React.SetStateAction<T>>;
    constructor(hs: ControllerSetter<T>);
}
declare abstract class ControllerWState<T> extends Controller<T> {
    abstract state: T;
}
declare type ControllerSetter<T> = [T, React.Dispatch<React.SetStateAction<T>>];
declare function useController<T, H>(fun: (c: Controller<T>) => H, initial_value: T | (() => T)): [T, Controller<T> & H];
declare function useController<T, H>(fun: (c: Controller<T>) => H, initial_value?: T | (() => T)): [H extends ControllerWState<T> ? T : T | undefined, Controller<T> & H];
export { Controller, useController, ControllerSetter };
