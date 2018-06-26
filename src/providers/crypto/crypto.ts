import { Injectable } from '@angular/core';
import {vsprintf} from 'sprintf-js'
import cookie from 'cookie'
/*
  Generated class for the CryptoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CryptoProvider {


  decryptString(passphrase:string, encodedData : string):PromiseLike<{}>{
    //Decode string
      const decoded = this.stringToArrayBuffer(window.atob(encodedData));
      const salt = decoded.slice(0,16)
      const data = decoded.slice(16)

      return this.importKey(passphrase, salt).then((key) => {

        return (window.crypto.subtle.decrypt(
          {
              name: "AES-GCM",
              iv: salt,
              tagLength: 128,
          },
          key,
          data
        ) as Promise<ArrayBuffer>)
        .then((decrypted) => {
          console.log(this.bufferToString(new Uint8Array(decrypted)))
          return JSON.parse(this.bufferToString(new Uint8Array(decrypted))) as {}
        })
        .catch((error : Error) => {
          return;
        })
  
      })
    
  }

  setTokenInCookie(name : string, value : string, experationLength : number){
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + experationLength;
      console.log(now['toGMTString']())
      now.setTime(expireTime);
      document.cookie = vsprintf('%s=%s;expires=%s;path=/',[name,value,now['toGMTString']()]);
  }

  getTokenFromCookie (name : string):string {
    var cookies = cookie.parse(document.cookie);
    return cookies[name] || null
  }

  deleteCookie(name : string){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  encryptObject(passphrase : string, object : {}):PromiseLike<string>{
    const salt = this.generateSalt(); 

    return this.importKey(passphrase,salt).then((key) => {

      return window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
    
            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: salt,

    
            //Tag length (optional)
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        key, //from generateKey or importKey above
        this.stringToArrayBuffer(JSON.stringify(object))
         ) 
        .then((encrypted) => {
          console.log(encrypted)

          //Note: Converts to Base64 string
          //Concatonate typed arrays
          const saltLength = salt.length
          const encryptedLength = encrypted.byteLength
          const data = new Uint8Array(saltLength + encryptedLength)
          data.set(salt, 0)
          data.set(new Uint8Array(encrypted), saltLength)
          console.log(window.btoa(this.bufferToString(data)))
          return window.btoa(this.bufferToString(data))
            //returns an ArrayBuffer containing the encrypted data
        })      
    })
  }



  /**
   * Converts from string to array buffer
   * Credits:  https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
   * @param str 
   */
  stringToArrayBuffer(str : string):Uint8Array{
    let encBuff = new Uint8Array(str.length);
    for (let i = 0; i < encBuff.length; i++) {
        encBuff[i] = str.charCodeAt(i);
    }
    return encBuff;
  }

  /**
   * Converts from array buffer to string
   * Credits:  https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
   * @param Array buffer 
   */
  bufferToString(buf : ArrayBuffer | Uint8Array):string {
    return String.fromCharCode.apply(null, buf);
  }

  /**
   * Generates a salt
   * @returns IV representing salt
   */
  generateSalt():Uint8Array{
    return window.crypto.getRandomValues(new Uint8Array(16)) as Uint8Array
  }

  /**
   * Gets key from passprase
   * @param passphrase Passphrase to get key from
   */
  importKey(passphrase : string, salt : Uint8Array):PromiseLike<CryptoKey>{
    return  window.crypto.subtle.importKey(
      "raw", //only "raw" is allowed
      this.stringToArrayBuffer(passphrase),
      "PBKDF2",
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["deriveKey", "deriveBits"] //can be any combination of "deriveKey" and "deriveBits"
    ).then((key) => {
      return window.crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            salt: salt,
            iterations: 2000,
            hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        key, //your key from generateKey or importKey
        { //the key type you want to create based on the derived bits
            name: "AES-GCM", //can be any AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "ECDH", "DH", or "HMAC")
            //the generateKey parameters for that type of algorithm
            length: 256, //can be  128, 192, or 256
        },
        false, //whether the derived key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //limited to the options in that algorithm's importKey
    )
    })
  }

}
