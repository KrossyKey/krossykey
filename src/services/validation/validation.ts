import Ajv from 'ajv'

export class ValidationService<T> {

  private validate:Ajv.ValidateFunction

  constructor(private schema :  {}, private data : T){

    var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    this.validate = ajv.compile(schema);

  }

  get isValid():boolean{
    this.validate(this.data)
    console.log(this.validate(this.data),this.validate.errors, this.data,this.schema)
    return this.validate(this.data) as boolean
  }

  validateFor(data : T):boolean{
    this.validate(data)
    console.log(this.validate(data),this.validate.errors, data)
    return this.validate(data) as boolean
  }

}
