import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

export function encrypTextId(id) {
  const ciphertext = CryptoJS.AES.encrypt(id, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return ciphertext;
}

export function decryptTextId(data) {
  const bytes = CryptoJS.AES.decrypt(data, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  const orginalText = bytes.toString(CryptoJS.enc.Utf8);

  return orginalText;
}
