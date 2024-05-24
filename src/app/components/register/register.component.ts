import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpService } from '../../services/http.service';
import { RegisterDTO } from '../../models/dto/register.dto';
import { AuthService } from '../../services/auth.service';
import { AlertService, AlertType } from '../../services/alert-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected waiting: boolean = false;

  protected displayName: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);
  protected username: FormControl = new FormControl(null, {
    updateOn: 'blur',
    validators: [Validators.required, Validators.minLength(5)],
  });
  protected password: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ]);
  protected confirmPassword: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  protected agreement: FormControl = new FormControl(false);

  public registerForm: FormGroup = new FormGroup(
    {
      displayName: this.displayName,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      agreement: this.agreement,
    },
    [this.formGroupMatchValidator('confirmPassword', 'password')]
  );

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    if (authService.isLoggedIn) router.navigate(['home']);
  }

  public matchValidator(
    controlToMatch: AbstractControl<any, any>
  ): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      return control.value === controlToMatch.value ? null : { notMatch: true };
    };
  }

  public formGroupMatchValidator(
    controlToValidate: string,
    controlToMatch: string
  ): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      const validateValue = control.get(controlToValidate);
      const matchValue = control.get(controlToMatch);
      return validateValue &&
        matchValue &&
        validateValue.value === matchValue.value
        ? null
        : { notMatch: true };
    };
  }

  register() {
    this.alertService.clearAlert();
    if (!this.registerForm.valid) {
      this.alertService.appendAlert(
        'Thông tin không hợp lệ, vui lòng kiểm tra lại',
        AlertType.danger,
        0,
        'form-wrapper'
      );
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
      next: async (res) => {
        console.log('res:', res);

        this.waiting = false;
        this.router.navigate(['home']);

        this.authService.login(res.jwt);
        this.alertService.appendAlert(
          'Đăng ký thành công, chuyển hướng về trang chủ',
          AlertType.success,
          3,
          'form-wrapper'
        );
        await new Promise((f) => setTimeout(f, 3000));
      },
      error: (err) => {
        this.waiting = false;
        switch (err.status) {
          case 409:
            this.alertService.appendAlert(
              'Tên đăng nhập đã tồn tại',
              AlertType.danger,
              0,
              'form-wrapper'
            );
            break;

          case 400:
            this.alertService.appendAlert(
              'Thông tin không hợp lệ',
              AlertType.danger,
              0,
              'form-wrapper'
            );
            break;

          case 0:
            this.alertService.appendAlert(
              'Đã xảy ra sự cố với mạng',
              AlertType.danger,
              0,
              'form-wrapper'
            );
            break;

          default:
            break;
        }
      },
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
