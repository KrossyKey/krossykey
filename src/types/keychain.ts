import { Password } from "./password";
import { SecureNote } from "./secure-note";
import { TwoFactor } from "./two-factor";

export interface Keychain{
    passwords:Password[];
    secureNotes:SecureNote[];
    twoFactors:TwoFactor[];

}

export let KEYCHAIN_DEFAULT = {
    passwords:[],
    secureNotes:[],
    twoFactors:[],
};