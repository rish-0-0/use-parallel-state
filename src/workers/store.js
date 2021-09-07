import {expose} from "comlink";
import Store from "../Store.class.js";

const store = new Store();
expose(store, self);