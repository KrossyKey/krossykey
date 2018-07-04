import Ajv from 'ajv';

export function ValidationExtensions(ajv : Ajv.Ajv):Ajv.Ajv{
    ajv.addKeyword('validateAllForSchema', {
        type: 'array',
        compile (schema : {}) {

            const valAjv = new Ajv();
            const validate = valAjv.compile(schema);
      
            return  (data) => {
                let isValid = true;
                for(const dataObject of data) {
                    if (!(validate(dataObject) as boolean)){
                        isValid = false;
                        break;
                    }

                } 
                return isValid;
            };
        }
    });

    return ajv;
      
}