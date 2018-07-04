export let PASSWORD_SCHEMA = {
    type: "object",
    properties : {
        
        title:{
            type: "string",
            minLength: 1
        },
        userName:{
            type: "string",
            minLength: 1
        },
        password:{
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
    required: ["title", "userName", "password", "url","uuid"]
};