import hash from 'object-hash'

/**
 * Generates Checksum of objects
 */

export class Identified<T>{
    /**
     * Intializes __Identified__
     * @param model Model to be checksumed
     */
    constructor(readonly model : T){

    }

    /**
     * @returns Generates uuid based on checksum of object
     */
    get uuid():string{
        return hash(this.model)
    }
    
}