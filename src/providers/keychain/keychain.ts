import { Injectable } from '@angular/core';
import { KEYCHAIN_DEFAULT, Keychain } from '../../types/keychain';
import { Storage } from '@ionic/storage';
import { ValidationService } from '../../services/validation/validation';
import { KEYCHAIN_SCHEMA } from '../../schema/keychain';
import { LocalizedToastProvider } from '../localized-toast/localized-toast';
import { StorageID } from '../../app/app.component';
import { Identified } from '../../types/identified';
import { CryptoProvider } from '../crypto/crypto';


/**
 * 
 */
export enum StorageResponse{
  INVALID_KEYCHAIN,
  INVALID_PASSCODE,
  KEYCHAIN_NOT_SET,
  SUCCESS
}

/*
  Reads password from database
*/
@Injectable()
export class KeychainProvider {

  private keychainValidator:ValidationService<Keychain>
  private _keychain:Keychain;
  private _storageResp:StorageResponse = StorageResponse.SUCCESS;

  constructor(readonly storage : Storage, private localizedToast : LocalizedToastProvider, readonly crypto : CryptoProvider) {
    this.keychainValidator = new ValidationService<Keychain>(KEYCHAIN_SCHEMA,this._keychain)
  }

  /**
   * Descibes Whether keychain is valid
   */
  get storageResp():StorageResponse{
    return this._storageResp
  }

  /**
   * Resets keychain to default when keychain is invalid
   */
  invalidKeychain(){
    this._keychain = KEYCHAIN_DEFAULT
    this.localizedToast.displayToastFor('validation.invalidKeychain')
    this._storageResp = StorageResponse.INVALID_KEYCHAIN
  }

  /**
   * Resets keychain to default when keychain is invalid
   */
  invalidPassphrase(){
    this._keychain = KEYCHAIN_DEFAULT
    this.localizedToast.displayToastFor('validation.invalidPassphrase')
    this._storageResp = StorageResponse.INVALID_PASSCODE
  }



  /**
   * Unlocks keychain
   * @param passphrase Passphrase to unlock with
   */
  unlockKeychain(passphrase : string):Promise<StorageResponse>{
      return this.storage.get('keychain').then((encrypted : string) => {
        console.log(encrypted)
        if (encrypted){
          const decrypted = this.crypto.decryptString(passphrase,encrypted)
          if (decrypted){
            return decrypted.then((keychain : Keychain) => {
              if (keychain){
                if (this.keychainValidator.validateFor(keychain)){
                  this._storageResp = StorageResponse.SUCCESS
                  this._keychain = keychain

                }else{
                  this.invalidKeychain()
                }
              }else{
                this.invalidPassphrase()
              }
              return this._storageResp
            })
          }else{
            this.invalidKeychain()
            return this._storageResp
          }

        }else{
          this._storageResp = StorageResponse.KEYCHAIN_NOT_SET
          this._keychain = KEYCHAIN_DEFAULT
          return this.crypto.encryptObject(passphrase, this._keychain).then((encrypted : string) =>{
            this.storage.set('keychain',encrypted)
            return this._storageResp
          })       
        }
      })


  }



  /**
   * Locks Keychain
   * @param passphrase Passphrase to lock with
   */
  lockKeychain(passphrase : string){
    this.crypto.encryptObject(passphrase, this._keychain).then((encrypted : string) =>{
      this.storage.set('keychain',encrypted)
    })
    this._keychain = null
  }



  getKeychain(storageID : StorageID):Identified[]{
    return this._keychain[storageID]
  }

  setKeychainProperty(passphrase : string, storageID : StorageID, identified : Identified[]){
    this._keychain[storageID] = identified as Keychain[StorageID]
    this.crypto.encryptObject(passphrase, this._keychain).then((encrypted : string) =>{
      this.storage.set('keychain',encrypted)
    })  
  }

  setKeychain(passphrase : string, keychain : Keychain){
    this.crypto.encryptObject(passphrase, keychain).then((encrypted : string) =>{
      this.storage.set('keychain',encrypted)
    })  
  }
  
}
