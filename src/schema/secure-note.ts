export let SECURE_NOTE_SCHEMA = {
    type: "object",
    properties : {
        
        title:{
            type: "string",
            minLength: 1
        },
        body:{
            type: "string",
            minLength: 1
        },
        url:{
            type: "string",
            minLength: 1
        },
        uuid:{
            type: "string",
            minLength: 1,
            hidden: true
        }
    },

    additionalProperties:false,
    required: ["title", "body", "url","uuid"]
};