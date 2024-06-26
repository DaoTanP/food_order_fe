import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AlertService, AlertType } from '../../services/alert-service.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected waiting: boolean = false;

  protected username: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);
  protected password: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  public loginForm: FormGroup = new FormGroup({
    username: this.username,
    password: this.password,
  });

  constructor(
    private httpService: HttpService,
    private alertService: AlertService,
    private dataService: DataService,
    private authGuardService: AuthService,
    private router: Router
  ) {
    if (authGuardService.isLoggedIn) router.navigate(['home']);
  }

  public login(): void {
    this.alertService.clearAlert();
    if (!this.loginForm.valid) {
      this.alertService.appendAlert(
        'Thông tin không hợp lệ, vui lòng kiểm tra lại',
        AlertType.danger,
        0,
        'form-wrapper'
      );
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const user = new User();
    user.userName = username;
    user.password = password;

    this.waiting = true;

    this.httpService.login(user).subscribe({
      next: async (res) => {
        this.waiting = false;

        this.router.navigate(['home']);
        this.dataService.setSession('access_token', res.jwt);
        this.authGuardService.login(res.accessToken);
        this.alertService.appendAlert(
          'Đăng nhập thành công, chuyển hướng về trang chủ',
          AlertType.success,
          3,
          'form-wrapper'
        );
        await new Promise((f) => setTimeout(f, 3000));
      },
      error: (err) => {
        this.waiting = false;
        switch (err.status) {
          case 400:
            break;
          case 404:
          case 401:
            this.alertService.appendAlert(
              'Tên đăng nhập hoặc mật khẩu không đúng',
              AlertType.danger,
              0,
              'form-wrapper'
            );
            break;

          case 0:
            this.alertService.appendAlert(
              'Không thể kết nối với máy chủ, vui lòng thử lại sau',
              AlertType.danger,
              0,
              'form-wrapper'
            );
            break;

          default:
            this.alertService.appendAlert(
              'Đã xảy ra lỗi, vui lòng thử lại sau',
              AlertType.danger,
              0,
              'form-wrapper'
            );
            break;
        }
      },
    });
  }
}
