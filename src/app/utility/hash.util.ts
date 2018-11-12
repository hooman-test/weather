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

  static async getSha256(message: string) {

    // encode as UTF-8
    const msgBuffer = HashUtil.string2Buffer(message);

    // hash the message
    const cryptoObj = window.crypto || window['msCrypto']; // for IE 11
    let hashBuffer = await cryptoObj.subtle.digest('SHA-256', msgBuffer);

    const isIE = /msie\s|trident\//i.test(window.navigator.userAgent);
    if (isIE) {
      hashBuffer = hashBuffer['result']; // ie hack, because of old crypto api in ie11
    }

    // convert ArrayBuffer to Array
    let hashArray;
    try {
      hashArray = Array.from(new Uint8Array(hashBuffer));
    } catch (e) {
      throw Error('Can not build hashArray from: ' + hashBuffer);
    }

    // convert bytes to hex string
    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  }
}
