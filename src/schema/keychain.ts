import { PASSWORD_SCHEMA } from "./password";
import { SECURE_NOTE_SCHEMA } from "./secure-note";
import { TWO_FACTOR_SCHEMA } from "./two-factor";

export let KEYCHAIN_SCHEMA = {
    type: "object",
    properties : {
        
        passwords:{
            type: "array",
            validateAllForSchema: PASSWORD_SCHEMA
        },
        secureNotes:{
            type: "array",
            validateAllForSchema: SECURE_NOTE_SCHEMA
        },
        twoFactors:{
            type: "array",
            validateAllForSchema: TWO_FACTOR_SCHEMA
        },
        settings:{
            type: "array",
            validateAllForSchema: TWO_FACTOR_SCHEMA
        }
    },

    additionalProperties:false,
    required: ["passwords", "secureNotes", "twoFactors"]
};