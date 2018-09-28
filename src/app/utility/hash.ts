/**
 * This code has been copied from: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */
export class HashUtility {
  static string2Buffer(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  static hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
      // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)

      const value = view.getUint32(i);
      // toString(16) will give the hex representation of the number without padding
      const stringValue = value.toString(16);
      // We use concatenation and slice for padding
      const padding = '00000000';
      const paddedValue = (padding + stringValue).slice(-padding.length);
      hexCodes.push(paddedValue);
    }

    // Join all the hex strings into one
    return hexCodes.join('');
  }

  static getSha256(str: string): any {
    // We transform the string into an arrayBuffer.
    const buffer = HashUtility.string2Buffer(str);
    return crypto.subtle.digest('SHA-256', buffer).then(hash => {
      return HashUtility.hex(hash);
    });
  }
}
