import { Injectable } from '@angular/core';
import { KEYCHAIN_DEFAULT, Keychain } from '../../types/keychain';
import { Storage } from '@ionic/storage';
import { ValidationService } from '../../services/validation/validation';
import { KEYCHAIN_SCHEMA } from '../../schema/keychain';
import { LocalizedToastProvider } from '../localized-toast/localized-toast';
import { StorageID, AppComponent, Mode } from '../../app/app.component';
import { Identified } from '../../types/identified';
import { CryptoProvider } from '../crypto/crypto';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Platform } from 'ionic-angular';

/**
 * Storage Response
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

  private keychainValidator:ValidationService<Keychain>;
  private _keychain:Keychain;
  private _storageResp:StorageResponse = StorageResponse.SUCCESS;
  private secureDatabase:Promise<SecureStorageObject>;
  constructor(private storage : Storage, private localizedToast : LocalizedToastProvider, 
    private crypto : CryptoProvider, private secureStorage : SecureStorage, private platform : Platform) {
    this.platform.ready().then(() => {
      if (AppComponent.mode === Mode.mobile){
        this.secureDatabase = this.secureStorage.create('krossykey');
      }
     
    this.keychainValidator = new ValidationService<Keychain>(KEYCHAIN_SCHEMA,this._keychain);

  });

  }

  /**
   * Descibes Whether keychain is valid
   */
  get storageResp():StorageResponse{
    return this._storageResp;
  }

  /**
   * Resets keychain to default when keychain is invalid
   */
  invalidKeychain(){
    this._keychain = KEYCHAIN_DEFAULT;
    this.localizedToast.displayToastFor('validation.invalidKeychain');
    this._storageResp = StorageResponse.INVALID_KEYCHAIN;
  }

  /**
   * Resets keychain to default when keychain is invalid
   */
  invalidPassphrase(){
    this._keychain = KEYCHAIN_DEFAULT;
    this.localizedToast.displayToastFor('validation.invalidPassphrase');
    this._storageResp = StorageResponse.INVALID_PASSCODE;
  }

  storePassphraseSecurely(passphrase : string){
    if (AppComponent.mode === Mode.desktop){
      //--[electron_build] const keytar = require('keytar')
      //--[electron_build] keytar.setPassword('krossykey','krossykeytoken',passphrase)
    }else if (AppComponent.mode === Mode.mobile){
      return this.secureDatabase.then((secureStorage: SecureStorageObject) => {
      
        return secureStorage.set('krossykey',passphrase)
        .then(
        () =>true,
          () =>false
        );
      });
    }else{
      this.storage.set('krossykey',passphrase).then(
        () =>true,
         () =>false
      );}
    }



  removePassphraseSecurely():Promise<boolean>{

    if (AppComponent.mode === Mode.desktop){
      //--[electron_build] const keytar = require('keytar')
      //--[electron_build] return keytar.deletePassword('krossykey','krossykeytoken')
    }else if (AppComponent.mode === Mode.mobile){
      return this.secureDatabase.then((secureStorage: SecureStorageObject) => {

          return secureStorage.remove('krossykey')
          .then(
              () =>true,
              () =>false
          );
      });
    }else{
      return this.storage.remove('krossykey').then(
        () =>true,
         () =>false
       );
    }

  }


  fetchPassphraseSecurely():Promise<string>{

    if (AppComponent.mode === Mode.desktop){
      //--[electron_build] const keytar = require('keytar')
      //--[electron_build] return keytar.getPassword('krossykey','krossykeytoken')
    }else if (AppComponent.mode === Mode.mobile){
      return this.secureDatabase.then((secureStorage: SecureStorageObject) => {
          return secureStorage.get('krossykey')
          .then(
            (passphrase:string) =>passphrase,
            () =>null
          );
      });
    }else{
      return this.storage.get('krossykey').then((passphrase : string) => {
        return passphrase;
      });
    }


  }

  changePassphrase(passphrase : string, newPassphrase : string):Promise<StorageResponse>{
    return this.unlockKeychain(passphrase).then((resp : StorageResponse) =>{
      if (resp === StorageResponse.SUCCESS){
        this.lockKeychain(newPassphrase);
      }
      return resp;
    });
  }

  /**
   * Unlocks keychain
   * @param passphrase Passphrase to unlock with
   */
  unlockKeychain(passphrase : string):Promise<StorageResponse>{
      return this.getRawKeychain().then((encrypted : string) => {
        if (encrypted){
          const decrypted = this.crypto.decryptStringFromPhrase(passphrase,encrypted);
          if (decrypted){
            console.log(encrypted);
            return decrypted.then((keychain : Keychain) => {
              if (keychain){
                if (this.keychainValidator.validateFor(keychain)){
                  this._storageResp = StorageResponse.SUCCESS;
                  this._keychain = keychain;

                }else{
                  this.invalidKeychain();
                }
              }else{
                this.invalidPassphrase();
              }
              return this._storageResp;
            });
          }else{
            this.invalidKeychain();
            return this._storageResp;
          }

        }else{
          this._storageResp = StorageResponse.KEYCHAIN_NOT_SET;
          this._keychain = KEYCHAIN_DEFAULT;
          return this.crypto.encryptObjectFromPhrase(passphrase, this._keychain).then((encrypted : string) =>{
            this.setRawKeychain(encrypted);
            return this._storageResp;
          });       
        }
      });
  }



  /**
   * Locks Keychain
   * @param passphrase Passphrase to lock with
   */
  lockKeychain(passphrase : string){
    this.crypto.encryptObjectFromPhrase(passphrase, this._keychain).then((encrypted : string) =>{
      this.setRawKeychain(encrypted);
    });
    this._keychain = null;
  }



  getKeychain(storageID : StorageID, passphrase : string):Promise<Identified[]>{
    return this.getRawKeychain().then((encrypted : string) => {
    
      return this.crypto.decryptStringFromPhrase(passphrase, encrypted).then((decrypted : Keychain) =>{
        return decrypted[storageID];

      });  
    });
  }

  setKeychainProperty(passphrase : string, storageID : StorageID, identified : Identified[]){
    this._keychain[storageID] = identified as Keychain[StorageID];
    this.crypto.encryptObjectFromPhrase(passphrase, this._keychain).then((encrypted : string) =>{
      this.setRawKeychain(encrypted);
    });  
  }

  setKeychain(passphrase : string, keychain : Keychain){
    this.crypto.encryptObjectFromPhrase(passphrase, keychain).then((encrypted : string) =>{
      this.setRawKeychain(encrypted);
    });  
  }

  keychainIsEmpty():Promise<boolean>{
    return this.getRawKeychain().then((encrypted : string) => {
      if (encrypted){
        return false;
      }else{
        this._storageResp = StorageResponse.KEYCHAIN_NOT_SET;
        return true;
      }
    });
  }


  setKeychainPath(path : string):Promise<void>{
    return this.storage.set('keychainFilePath',path);
  }

  deleteKeychainPath(){
    this.storage.remove('keychainFilePath');
  }

  getKeychainPath():Promise<string>{
    return this.storage.get('keychainFilePath');
  }

  setRawKeychain(rawKeychain : string):Promise<void>{
    if (AppComponent.mode === Mode.desktop){

      return this.getKeychainPath().then((path : string) =>{
      //--[electron_build] const fs = require('fs');
      if (path){
        //--[electron_build] fs.writeFile(path, rawKeychain);
      }else{
        //--[electron_build] const {dialog} = require("electron").remote;
        //--[electron_build] var savePath = dialog.showSaveDialog({defaultPath : "~/keychain.kk"});
        //--[electron_build] path = savePath
        //--[electron_build] fs.writeFile(savePath, rawKeychain)
        return this.setKeychainPath(path);
      }
      
      });

    }else{
      return this.storage.set('keychain',rawKeychain);
    }

  }

  getRawKeychain():Promise<string>{
    if (AppComponent.mode === Mode.desktop){
      return this.getKeychainPath().then((path : string) =>{
          if (path){
            //--[electron_build] const fs = require('fs');
            try{
            //--[electron_build] return fs.readFileSync(path)
            }catch{
              this.deleteKeychainPath();
              return undefined;
            }
          }else{
            return undefined;
          }

      });
    }else{
      return this.storage.get('keychain');
    }
  }


  
}
