import HTMLEventEmitter from './htmlEventEmitter';

test('receive event', () => {
  const emitter = new HTMLEventEmitter();
  const handleMessage = jest.fn();

  emitter.addEventListener('message', handleMessage);

  emitter.emit('message', 'Hello, World!');

  expect(handleMessage).toHaveBeenCalledTimes(1);
  expect(handleMessage).toHaveBeenCalledWith('Hello, World!');
});
