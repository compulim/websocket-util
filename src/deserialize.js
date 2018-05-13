import { toByteArray } from 'base64-js';

export default function deserialize(data) {
  if (data.base64) {
    if (typeof Buffer === 'undefined') {
      return toByteArray(data.base64).buffer;
    } else {
      return Buffer.from(data.base64, 'base64');
    }
  } else {
    return data.string;
  }
}
