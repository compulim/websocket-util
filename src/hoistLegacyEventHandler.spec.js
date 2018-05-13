import { EventEmitter } from 'events';
import hoistLegacyEventHandler from './hoistLegacyEventHandler';

test('hoist legacy events', () => {
  const emitter = new EventEmitter();

  emitter.onmessage = jest.fn();
  hoistLegacyEventHandler(emitter, 'message');

  emitter.emit('message', 'Hello, World!');

  expect(emitter.onmessage).toHaveBeenCalledTimes(1);
  expect(emitter.onmessage).toHaveBeenCalledWith('Hello, World!');
});
