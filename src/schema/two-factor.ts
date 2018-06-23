export let TWO_FACTOR_SCHEMA = {
    type: "object",
    properties : {
        
        userName:{
            type: "string",
            minLength: 1
        },
        key:{
            type: "string",
            minLength: 1
        },
        url:{
            type: "string",
            minLength: 1
        },
        uuid:{
            type: "string",
            minLength: 1
        }
    },

    additionalProperties:false,
    required: ["userName", "url", "key","uuid"]
}