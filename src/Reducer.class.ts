/**
 * equivalent of an account
 */
export interface Action {
  type: string;
  payload: any;
};

export type ReducerUpdater = (action: Action) => any;

class Reducer<T> {
  id: string;
  state: T;
  updater: ReducerUpdater;
  constructor(id: string, updater: ReducerUpdater, initState: T) {
    this.id = id;
    this.state = initState;
    this.updater = updater;
  }
  setState(action: Action) {
    const newState = this.updater(action);
    this.state = newState;
  }
  getState() {
    return this.state;
  }
}
export default Reducer;