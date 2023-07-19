import React from "react"

class Controller<T> {

  public    state?              : T;
  readonly  setState            : React.Dispatch<React.SetStateAction<T>>; 


  constructor( hs : ControllerSetter<T>) { 
    this.setState = hs[1]; 
  }

}

abstract class ControllerWState<T> extends Controller<T> {
  abstract state    : T;
}


function initHandler<T, H>( hs : ControllerSetter<T>, fun? : ( s : ControllerSetter<T> ) => H ) {
  
  const controller = new Controller( hs );

  if(hs[0]) 
    controller.state = hs[0];

  if(fun)
    Object.assign(controller, fun( controller ) )

  return controller
  
}

type ControllerSetter<T> =  [T, React.Dispatch<React.SetStateAction<T>>];

function useController<T, H>( handlerClass : new ( s : ControllerSetter<T>, state? : T ) => H, initial_value : T | (() => T)) : [T, H]
function useController<T, H>( handlerClass : new ( s : ControllerSetter<T>, state? : T ) => H, initial_value? : T | (() => T)) : [ H extends ControllerWState<T> ? T : T | undefined, H]

function useController<T, H>( fun : ( s : ControllerSetter<T> ) => H, initial_value: T | (() => T)) : [T | undefined, Controller<T> & H ]  {
  const hs                          = React.useState<T>( initial_value );    
  const [handler, ]                 = React.useState<H>( () => initHandler( hs, fun )  );

  handler.state = hs[0];

  return [ handler.state, handler ];
}

export { Controller as StateHandler, useController as useStateHandler, ControllerSetter as HandlerSetter }

