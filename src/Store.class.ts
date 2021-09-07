// @ts-ignore 
/**
 * equivalent of acccountId -> account { ... }
 * reducerId -> reducer { ... }
 */

import Reducer, { Action, ReducerUpdater } from "./Reducer.class";

class Store {
  state!: Map<string, Reducer<any>>;
  static instance: Store;
  constructor() {
    if (Store.instance) {
      // singleton
      return Store.instance;
    }
    Store.instance = this;
    this.state = new Map<string, Reducer<any>>();
  }
  hasReducer(reducerId: string, callback: (isPresent: boolean) => void) {
    if (this.state.has(reducerId)) {
      callback(true);
    } else {
      callback(false);
    }
  }
  setReducer<T>(reducerId: string, updater: ReducerUpdater, initState: T) {
    const reducer = this.state.get(reducerId);
    if (reducer) {
      reducer.updater = updater;
      return;
    }
    const newReducer = new Reducer<T>(reducerId, updater, initState);
    this.state.set(newReducer.id, newReducer);
  }
  emptyStore() {
    this.state.clear();
  }
  removeReducer(reducerId: string) {
    this.state.delete(reducerId);
  }
  mergeStore(stateMap: Map<string, any>) {
    this.state = new Map([...this.state, ...stateMap]);
  }
  updateReducer(reducerId: string, action: Action, callback: (v: any) => void) {
    const reducer = this.state.get(reducerId);
    if (!reducer) {
      callback(new Error(`reducer not found with id: ${reducerId}`));
      return;
    }
    reducer.setState(action);
    callback(reducer.getState());
  }
}

export default Store;