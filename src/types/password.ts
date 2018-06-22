/**
 * Password model
 */
export interface Password{
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
    /**
     * Url of password
     */
    readonly url:string
}

/**
 * Password model default
 */
export let PASSWORD_DEFAULT:Password = {
    title:"",
    userName:"",
    password:"",
    url:""
};

export let SamplePassword:Password = {
    title:"Personal",
    userName:"afshawn",
    password:"password",
    url:"www.google.com",
}