import { ACCOUNT_SCHEMA } from "./account";
import { SECURE_NOTE_SCHEMA } from "./secure-note";

export let KEYCHAIN_SCHEMA = {
    type: "object",
    properties : {
        
        accounts:{
            type: "array",
            validateAllForSchema: ACCOUNT_SCHEMA
        },
        secureNotes:{
            type: "array",
            validateAllForSchema: SECURE_NOTE_SCHEMA
        },

    },

    additionalProperties:false,
    required: ["accounts", "secureNotes"]
};