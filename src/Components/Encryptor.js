import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

export function encryptId(data) {
  const plaintext = JSON.stringify(data);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  return ciphertext;
}

export function decryptId(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
}
