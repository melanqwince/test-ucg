import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[passwordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorReactiveDirective,
      multi: true
    }
  ]
})
export class PasswordValidatorReactiveDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    if (!(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(control.value))) {
      return { passwordError: true };
    }
    return null;
  }
}
