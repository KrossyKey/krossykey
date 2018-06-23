import Ajv from 'ajv'

export function ValidationExtensions(ajv : Ajv.Ajv):Ajv.Ajv{
    ajv.addKeyword('validateAllForSchema', {
        type: 'array',
        compile: function (schema : {}) {

            var valAjv = new Ajv();
            var validate = valAjv.compile(schema);
      
            return function (data) {
                var isValid = true
                for(var dataObject of data) {
                    if (!(validate(dataObject) as boolean)){
                        isValid = false
                        break
                    }

                } 
                return isValid;
            }
        }
    });

    return ajv
      
}