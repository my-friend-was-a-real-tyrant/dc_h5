const CryptoJS = require('crypto-js');  //引用AES源码js
var key  = CryptoJS.enc.Utf8.parse("sklhdfloifsdgdeg");
var iv   = CryptoJS.enc.Utf8.parse('1111225444664444');

function Decrypt(word) {
        var decrypted = CryptoJS.AES.decrypt(word, key, {
                iv:iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
      }　
export default {
        Decrypt
}