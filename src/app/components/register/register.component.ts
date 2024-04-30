import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpService } from '../../services/http.service';
import { RegisterDTO } from '../../models/dto/register.dto';

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

  constructor(private httpService: HttpService){}


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

  register(){
    // this.alertService.clearAlert();
    if (!this.registerForm.valid)
    {
      // this.alertService.appendAlert('Thông tin không hợp lệ, vui lòng kiểm tra lại', AlertType.danger, 0, 'form-wrapper');
      return;
    }

    const user: RegisterDTO = new RegisterDTO();
    user.userName = this.registerForm.value.username;
    user.password = this.registerForm.value.password;
    user.confirmPassword = this.registerForm.value.confirmPassword;
    user.displayName = this.registerForm.value.displayName;

    // console.log(user);
    this.waiting = true;

  this.httpService.register(user).subscribe({
    next: async res =>
    {
      console.log('res:', res);

      this.waiting = false;

      // this.router.navigate(['home']);
      // this.authGuardService.login(res.accessToken);
      // this.alertService.appendAlert('Đăng nhập thành công, chuyển hướng về trang chủ',
      //   AlertType.success, 3, 'form-wrapper');
      // await new Promise(f => setTimeout(f, 3000));
    },
    // error: err =>
    // {
    //   this.waiting = false;
    //   switch (err.status)
    //   {
    //     case 404:
    //       this.alertService.appendAlert('Tên đăng nhập hoặc mật khẩu không đúng', AlertType.danger, 0, 'form-wrapper');
    //       break;

    //     case 0:
    //       this.alertService.appendAlert('Không thể kết nối với máy chủ, vui lòng thử lại sau', AlertType.danger, 0, 'form-wrapper');
    //       break;

    //     default:
    //       this.alertService.appendAlert('Đã xảy ra lỗi, vui lòng thử lại sau', AlertType.danger, 0, 'form-wrapper');
    //       break;
    //   }
    // }
  });
  }

  // public registerForm !: FormGroup;
  // constructor (private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}
  // ngOnInit():void {
  //   this.registerForm = this.formBuilder.group({
  //     displayName: [''],
  //     username: [''],
  //     password: '',
  //     confirmPassword: [''],
  //     agreement: Boolean,
  //   })
  // }

  // register(){
  //   this.http.post<any>("http://localhost:3000/registerUser", this.registerForm.value)
  //   .subscribe( res => {
  //     alert("Successfully registered");
  //     this.registerForm.reset();
  //     this.router.navigate(['login']);
  //   })
  // }

}
