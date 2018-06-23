import Ajv from 'ajv'

export class ValidationService<T> {

  private validate:Ajv.ValidateFunction

  constructor(private schema :  {}, private data : T){

    var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    this.validate = ajv.compile(schema);

  }

  get isValid():boolean{
    return this.validate(this.data) as boolean
  }

  validateFor(data : T):boolean{
    return this.validate(data) as boolean
  }

}
