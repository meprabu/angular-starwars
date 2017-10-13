import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[min]',
  // register validator in DI
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective  implements Validator{

  constructor() { }

  @Input() min: number;

  // define validation logic
  validate(control: AbstractControl): ValidationErrors {
    const currentValue = control.value;
    const isValid = currentValue >= this.min;

    return isValid ? null : {min:{valid: false}};
  }

}
