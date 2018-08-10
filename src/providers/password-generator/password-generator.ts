import { Injectable } from '@angular/core';

export enum PasswordOption{
  special = "special",
  numeric = "numeric",
  upper = "upper",
  lower = "lower"
}


/**
 * Generates randomly generated password
 */
@Injectable()
export class PasswordGeneratorProvider {

  generate(length : number, options : PasswordOption[]) {
    let password = "";
    let passwordSelectionArray = [];

    if (options.indexOf(PasswordOption.upper) > -1){
      const alpha = this.asciiArrayGenerator([
        {start : 65, length : 26}]);
      passwordSelectionArray = passwordSelectionArray.concat(alpha);
    }

    if (options.indexOf(PasswordOption.lower) > -1){
      const alpha = this.asciiArrayGenerator([
        {start : 97, length : 26}]);
      passwordSelectionArray = passwordSelectionArray.concat(alpha);
    }

    if (options.indexOf(PasswordOption.numeric) > -1){
      const numbers = this.asciiArrayGenerator([{start : 48, length : 10}]);
      passwordSelectionArray = passwordSelectionArray.concat(numbers);
    }

    if (options.indexOf(PasswordOption.special) > -1){
      const specialChar = this.asciiArrayGenerator([
        {start : 58, length : 7},
        {start : 33, length : 15},
        {start : 91, length : 6}]);
      passwordSelectionArray = passwordSelectionArray.concat(specialChar);      
    }


    while( password.length<length ) {
      password += passwordSelectionArray[Math.ceil((passwordSelectionArray.length - 1) * Math.random())];
    }
    
    return password;
  }

  /**
   * Stitches ascii characters together in array
   * @param ranges Ranges of ascii to stitch together
   */
  asciiArrayGenerator(ranges : Array<{start : number , length : number}>):string[]{
    let array = [];
    ranges.forEach(range => {
      const characters = Array.from({length: range.length}, (_, k) => String.fromCharCode(k+range.start));
      array = array.concat(characters);
    });
    return array;
  }

}
