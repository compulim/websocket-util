export default function hoistLegacyEvent(emitter, name) {
  const legacyName = `on${ name }`;

  emitter.on(name, event => emitter[legacyName] && emitter[legacyName](event));
}
