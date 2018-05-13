import { fromByteArray } from 'base64-js';

function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onerror = err => reject(err);
    fileReader.onload = () => resolve(fileReader.result);

    fileReader.readAsArrayBuffer(blob);
  });
}

export default function serialize(data) {
  if (typeof data === 'string') {
    return { string: data };
  } else if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
    return { base64: fromByteArray(new Uint8Array(data)) };
  } else if (typeof Buffer !== 'undefined' && data instanceof Buffer) {
    return { base64: data.toString('base64') };
  } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
    return blobToArrayBuffer(data).then(base64 => ({ base64 }));
  } else {
    throw new Error('unknown data type');
  }
}
