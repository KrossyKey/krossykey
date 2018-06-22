/**
 * Two Factor model
 */
export interface TwoFactor{
    /**
     * Two Factor user name
     */
    readonly userName:string;
    /**
     * Two Factor url or group
     */
    readonly url:string;
    /**
     * Two Factor secret key
     */
    readonly key:string;
}
/**
 * Two Factor model defualt
 */
export let TWO_FACTOR_DEFAULT:TwoFactor = {
    userName:"",
    url:"",
    key:""
};


export let SampleTwoFactor:TwoFactor = {
    userName:"afshawn",
    url:"www.google.com",
    key:"hxdm vjec jjws rb3h wizr 4ifu gftm xboz"
};
