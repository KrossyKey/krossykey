import { Identified } from "./identified";

/**
 * Account model
 */
export interface Account extends Identified{
    /**
     * Title of account
     */
    readonly title:string;
    /**
     * Username for account
     */
    readonly userName:string;
    /**
     * Password of account
     */
    readonly password:string;
    /**
     * Two factor key of account
     */
    readonly twoFactor:string;


}

/**
 * Password model default
 */
export let ACCOUNT_DEFAULT:Account = {
    title:"",
    userName:"",
    password:"",
    url:"",
    twoFactor:"",
    uuid:""
};