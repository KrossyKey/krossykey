import { Identified } from "./identified";

/**
 * Password model
 */
export interface Password extends Identified{
    /**
     * Title of password
     */
    readonly title:string;
    /**
     * Username for password
     */
    readonly userName:string;
    /**
     * Password of password
     */
    readonly password:string;

}

/**
 * Password model default
 */
export let PASSWORD_DEFAULT:Password = {
    title:"",
    userName:"",
    password:"",
    url:"",
    uuid:""

};