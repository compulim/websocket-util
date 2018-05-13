import { EventEmitter } from 'events';
import hoistLegacyEventHandler from './hoistLegacyEventHandler';

export const CONNECTING = 0;
export const OPEN = 1;
export const CLOSING = 2;
export const CLOSED = 3;

const DEFAULT_OPTIONS = {
  opened: false
};

export default class WebSocketBase extends EventEmitter {
  constructor(send, options = DEFAULT_OPTIONS) {
    super();

    this._send = send;
    this.readyState = options.opened ? OPEN : CONNECTING;

    ['close', 'error', 'message', 'open'].forEach(name => hoistLegacyEventHandler(this, name));

    this.once('open', () => {
      this.readyState = OPEN;
    });

    this.once('error', () => {
      this.end();
    });
  }

  get binaryType() { return 'arraybuffer'; }
  get bufferedAmount() { return 0; }
  get extensions() { return ''; }
  get protocol() { return 'ipc:'; }
  get url() { return `ipc://./`; }

  send() {
    if (this.readyState !== OPEN) {
      throw new Error('not open or already closed');
    }

    this._send.apply(this, arguments);
  }

  end() {
    if (this.readyState === OPEN) {
      this.readyState = CLOSED;
      this.emit('close');
    }
  }
}
