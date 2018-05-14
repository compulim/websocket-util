import deserialize from './deserialize';

test('invalid', () => {
  expect(() => {
    deserialize({});
  }).toThrow();
});

test('string', () => {
  expect(deserialize({ string: 'Hello, World!' })).toBe('Hello, World!');
});

test('buffer', () => {
  expect(deserialize({ base64: Buffer.from('Hello, World!').toString('base64') })).toEqual(Buffer.from('Hello, World!'));
});
