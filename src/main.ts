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


function initHandler<T, H>( hs : ControllerSetter<T>, fun? : ( s : Controller<T> ) => H ) {
  
  const controller = new Controller( hs );

  if(hs[0]) 
    controller.state = hs[0];

  if(fun)
    Object.assign(controller, fun( controller ) )

  return controller as Controller<T> & H
  
}

type ControllerSetter<T> =  [T, React.Dispatch<React.SetStateAction<T>>];

function useController<T, H>( fun : ( c : Controller<T> ) => H, initial_value : T | (() => T)) : [T, Controller<T> & H]
function useController<T, H>( fun : ( c : Controller<T> ) => H, initial_value? : T | (() => T)) : [ H extends ControllerWState<T> ? T : T | undefined, Controller<T> & H]

function useController<T, H>( fun : ( c : Controller<T> ) => H, initial_value: T | (() => T)) : [T | undefined, Controller<T> & H ]  {
  const cs                          = React.useState<T>( initial_value );    
  const [controller, ]                 = React.useState<Controller<T> & H>( () => initHandler( cs, fun )  );

  controller.state = cs[0];

  return [ controller.state, controller ];
}

export { Controller, useController, ControllerSetter }

