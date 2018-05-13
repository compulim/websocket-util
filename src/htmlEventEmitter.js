import { EventEmitter } from 'events';

export default class HTMLEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  addEventListener(name, listener) {
    this.on(name, listener);
  }

  removeEventListener(name, listener) {
    this.removeListener(name, listener);
  }
}
