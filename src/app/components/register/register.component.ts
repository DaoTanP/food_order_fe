import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected waiting: boolean = false;

  protected displayName: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  protected username: FormControl = new FormControl(null,
    {
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.minLength(5)
      ],
      // asyncValidators: this.usernameValidator()
    });
  protected password: FormControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  protected confirmPassword: FormControl = new FormControl(null, [Validators.required]);
  protected agreement: FormControl = new FormControl(false);

  public registerForm: FormGroup = new FormGroup({
    displayName: this.displayName,
    username: this.username,
    password: this.password,
    confirmPassword: this.confirmPassword,
    agreement: this.agreement
  }, [this.formGroupMatchValidator('confirmPassword', 'password')]);


  public matchValidator (controlToMatch: AbstractControl<any, any>): ValidatorFn
  {
    return (control: AbstractControl<any, any>): ValidationErrors | null =>
    {
      return (control.value === controlToMatch.value) ? null : { notMatch: true };
    }
  }

  public formGroupMatchValidator (controlToValidate: string, controlToMatch: string): ValidatorFn
  {
    return (control: AbstractControl<any, any>): ValidationErrors | null =>
    {
      const validateValue = control.get(controlToValidate);
      const matchValue = control.get(controlToMatch);
      return (validateValue && matchValue && validateValue.value === matchValue.value) ? null : { notMatch: true };
    }
  }
  //Toggle show/hide password
  // hidePassword: boolean = true;
  // toggleShowHidePassword(): void {
  //   this.hidePassword = !this.hidePassword;
  // }

  public register(): void {

  }
}
