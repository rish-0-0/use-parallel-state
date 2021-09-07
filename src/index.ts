import {useReducer, useRef} from "react";
import * as Comlink from "comlink";
import {ReducerUpdater,Action} from "./Reducer.class";
import Store from "./Store.class";

const worker = new Worker(new URL("./workers/store.js", import.meta.url), {type: "module"});
const store = Comlink.wrap<Store>(worker);


type Dispatcher = (action: Action, cb: (v: any) => void) => void;



function useParallelState<T>(reducerId: string, updater: ReducerUpdater, initState: T): [T, Dispatcher] {
  const state = useRef<T>(initState);
  const [, forceUpdater] = useReducer((x) => x + 1, 0);

  async function dispatch(action: Action, cb: (v: any) => void ) {
    await store.setReducer(reducerId, Comlink.proxy(updater), initState);
    const afterUpdate = (newState: T) => {
      state.current = newState;
      forceUpdater();
      cb(newState);
    };
    await store.updateReducer(reducerId, action, Comlink.proxy(afterUpdate));
  }

  return [state.current, dispatch];
} 

export default useParallelState;