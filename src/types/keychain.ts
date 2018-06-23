import { Password, SamplePassword } from "./password";
import { SecureNote, SampleSecureNote } from "./secure-note";
import { TwoFactor, SampleTwoFactor } from "./two-factor";

export interface Keychain{
    passwords:Password[]
    secureNotes:SecureNote[],
    twoFactors:TwoFactor[]
}

export let KEYCHAIN_DEFAULT = {
    passwords:[SamplePassword],
    secureNotes:[SampleSecureNote],
    twoFactors:[SampleTwoFactor],
}