import hash from 'object-hash'

export class Identified<T>{
    constructor(readonly model : T){

    }

    get uuid():string{
        return hash(this.model)
    }
    
}