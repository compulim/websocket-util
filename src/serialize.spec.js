import { fromByteArray, toByteArray } from 'base64-js';

import deserialize from './deserialize';
import serialize from './serialize';

test('serialize string', () => {
  const json = serialize('Hello, World!');

  expect(json).toEqual({ string: 'Hello, World!' });
});

test('serialize ArrayBuffer', () => {
  const base64 = Buffer.from('Hello, World!').toString('base64');
  const byteArray = toByteArray(base64);
  const json = serialize(byteArray.buffer);

  expect(json).toEqual({ base64 });
});

test('serialize node buffer', () => {
  const buffer = Buffer.from('Hello, World!');
  const json = serialize(buffer);

  expect(json).toEqual({ base64: buffer.toString('base64') });
});

test('deserialize string', () => {
  const actual = deserialize({ string: 'Hello, World!' });

  expect(actual).toBe('Hello, World!');
});

test('deserialize base64', () => {
  const actual = deserialize({ base64: Buffer.from('Hello, World!').toString('base64') });

  expect(actual).toBeInstanceOf(Buffer);
  expect(actual.toString()).toBe('Hello, World!');
});
