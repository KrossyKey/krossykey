import { Account } from "./account";
import { SecureNote } from "./secure-note";

export interface Keychain{
    accounts:Account[];
    secureNotes:SecureNote[];

}

export let KEYCHAIN_DEFAULT = {
    accounts:[],
    secureNotes:[],
};