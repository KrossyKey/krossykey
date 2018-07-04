import { Identified } from "./identified";

/**
 * Secure Note model
 */
export interface SecureNote extends Identified{
    /**
     * Note title
     */
    readonly title:string;
    /**
     * Note body
     */
    readonly body:string;

}

/**
 * Secure note model defualt
 */
export let SECURE_NOTE_DEFAULT:SecureNote = {
    title:"",
    body:"",
    url:"",
    uuid:""
};