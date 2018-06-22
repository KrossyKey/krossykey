/**
 * Secure Note model
 */
export interface SecureNote{
    /**
     * Note title
     */
    readonly title:string;
    /**
     * Note body
     */
    readonly body:string;
    /**
     * Note url
     */
    readonly url:string;
}

/**
 * Secure note model defualt
 */
export let SECURE_NOTE_DEFAULT:SecureNote = {
    title:"",
    body:"",
    url:""
};

export let SampleSecureNote:SecureNote = {
    title:"Cool",
    body:"BlaBal",
    url:"www.google.com"
};