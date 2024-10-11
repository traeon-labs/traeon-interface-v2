import * as CryptoJS from 'crypto-js';
interface RequestParams {
  [key: string]: string;
}

export function generateSignature(params: RequestParams): string {
  // Remove the 'sign' parameter from the object if it exists
  const filteredParams: RequestParams = Object.keys(params)
    .filter(key => key !== 'sign')
    .reduce((obj: RequestParams, key: string) => {
      obj[key] = params[key];
      return obj;
    }, {});

  // Sort the parameters alphabetically by their keys (ASCII order)
  const sortedKeys = Object.keys(filteredParams).sort();

  // Prepare the string for concatenation in 'key=value' format joined by '&'
  const paramString = sortedKeys
    .map(key => `${key}=${filteredParams[key]}`)
    .join('&');

  // Append the secret key to the final string
  const stringToSign = `${paramString}&key=${import.meta.env.VITE_AEON_SECRET_KEY}`;
  // Generate SHA-512 hash using CryptoJS and convert it to uppercase
  const signature = CryptoJS.SHA512(stringToSign).toString(CryptoJS.enc.Hex).toUpperCase();

  return signature;
}

