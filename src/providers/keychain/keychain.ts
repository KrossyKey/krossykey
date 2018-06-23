import { Injectable } from '@angular/core';
import { KEYCHAIN_DEFAULT, Keychain } from '../../types/keychain';
import { Storage } from '@ionic/storage';
import { ValidationService } from '../../services/validation/validation';
import { KEYCHAIN_SCHEMA } from '../../schema/keychain';
import { LocalizedToastProvider } from '../localized-toast/localized-toast';
import { StorageID } from '../../app/app.component';
import { Identified } from '../../types/identified';

/*
  Reads password from database
*/
@Injectable()
export class KeychainProvider {

  private keychainValidator:ValidationService<Keychain>
  private _keychain:Keychain;
  readonly doneLoading:Promise<void>

  constructor(private storage : Storage, private localizedToast : LocalizedToastProvider) {
    this.keychainValidator = new ValidationService<Keychain>(KEYCHAIN_SCHEMA,this._keychain)
    this.doneLoading = storage.get('keychain').then((keychain : Keychain) => {
      if (keychain){
        if (!(this.keychainValidator.validateFor(keychain))){
          this._keychain = KEYCHAIN_DEFAULT
          this.localizedToast.displayToastFor('validation.invalidKeychain')

        }else{
          this._keychain = keychain
        }
      }else{
        this.storage.set('keychain', KEYCHAIN_DEFAULT)
        this._keychain = KEYCHAIN_DEFAULT
      }
    })
  }

  getKeychain(storageID : StorageID):Identified[]{
    return this._keychain[storageID]
  }

  setKeychain(storageID : StorageID, identified : Identified[]){
    this._keychain[storageID] = identified as Keychain[StorageID]
    this.storage.set('keychain', this._keychain)
  }
  
}
