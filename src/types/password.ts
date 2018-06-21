export interface Password{
    readonly title:string;
    readonly userName:string;
    readonly password:string;
    readonly url:string
}

export let SamplePassword:Password = {
    title:"Personal",
    userName:"afshawn",
    password:"password",
    url:"www.google.com"
};

export let PASSWORD_DEFAULT:Password = {
    title:"",
    userName:"",
    password:"",
    url:""
};