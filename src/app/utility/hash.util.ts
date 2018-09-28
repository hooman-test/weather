/**
 * This code has been copied from: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */
export class HashUtil {
  static string2Buffer(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  static buffer2String(buf) {
    return buf.toString();
    // return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  async getSha256(message: string) {

    // encode as UTF-8
    const msgBuffer = HashUtil.string2Buffer(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  }
}
