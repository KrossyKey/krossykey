import { PASSWORD_SCHEMA } from "./password";
import { SECURE_NOTE_SCHEMA } from "./secure-note";
import { TWO_FACTOR_SCHEMA } from "./two-factor";

export let KEYCHAIN_SCHEMA = {
    type: "object",
    properties : {
        
        password:{
            type: "array",
            validateAllForSchema: PASSWORD_SCHEMA
        },
        secureNote:{
            type: "array",
            validateAllForSchema: SECURE_NOTE_SCHEMA
        },
        twoFactor:{
            type: "array",
            validateAllForSchema: TWO_FACTOR_SCHEMA
        }
    },

    additionalProperties:false,
    required: ["password", "secureNote", "twoFactor"]
}