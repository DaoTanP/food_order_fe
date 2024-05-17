import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
import { AuthGuardService } from '../../services/auth-guard.service';
import { AlertService, AlertType } from '../../services/alert-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  protected waiting: boolean = false;
  protected userInfo: User = new User();
  protected history: any[] = [];

  protected displayName: FormControl = new FormControl(null, [Validators.required]);
  protected phoneNumber: FormControl = new FormControl(null);
  protected email: FormControl = new FormControl(null);
  protected address: FormControl = new FormControl(null);

  public editInfoForm: FormGroup = new FormGroup({
    displayName: this.displayName,
    phoneNumber: this.phoneNumber,
    email: this.email,
    address: this.address,
  });
  // alertService: any;

  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private alertService: AlertService,
    private authGuardService: AuthGuardService,
    private router: Router,
  ) {
    // if (!authGuardService.isLoggedIn)
    //   router.navigate(['/login']);
    this.setData();
    // this.dataService.setData("navigateAfterLogOut", this.logOut);
  }

  setData() {
    this.waiting = true;
    this.httpService.getUserInfo().subscribe({
      next: async res => {
        // console.log(res);

        this.waiting = false;
        this.userInfo.value = res;
        this.editInfoForm.setValue({
          displayName: this.userInfo.displayName,
          phoneNumber: this.userInfo.phoneNumber || null,
          email: this.userInfo.email,
          address: this.userInfo.address,
        });
      },
      error: err => {
        this.waiting = false;
        switch (err.status) {
          case 0:
            this.alertService.appendAlert('Không thể kết nối với máy chủ, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
            break;

          default:
            this.alertService.appendAlert('Đã xảy ra lỗi, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
            break;
        }
      }
    });
  }

  submitChange() {
    this.waiting = true;

    // Remove all null attributes from the form
    const formValue = this.editInfoForm.value;
    const filteredValue = Object.keys(formValue)
      .filter((k) => formValue[k] != null)
      .reduce((a, k) => ({ ...a, [k]: formValue[k] }), {});

    this.httpService.editUserInfo(filteredValue).subscribe({
      next: res => {
        this.httpService.getUserInfo().subscribe((userInfo) => {
          this.userInfo.value = userInfo;
          this.waiting = false;
        });

        this.alertService.appendAlert('Cập nhật thông tin thành công', AlertType.success, 30, 'alert-container');
      }, error: err => {
        this.waiting = false;
        switch (err.status) {
          case 400:
          case 409:
            this.alertService.appendAlert('Thông tin không hợp lệ, vui lòng kiểm tra lại', AlertType.danger, 30, 'alert-container');
            break;

          case 0:
            this.alertService.appendAlert('Không thể kết nối với máy chủ, vui lòng thử lại sau', AlertType.danger, 30, 'alert-container');
            break;

          default:
            this.alertService.appendAlert('Đã xảy ra lỗi, vui lòng thử lại sau', AlertType.danger, 30, 'alert-container');
            break;
        }
      }
    });
  }

  delete() {
    // this.waiting = true;
    // this.httpService.deleteUser().subscribe({
    //   next: res =>
    //   {
    //     this.waiting = false;
    //     this.authGuardService.logOut();
    //     this.logOut(this.router);
    //     this.alertService.appendAlert('Xóa tài khoản thành công', AlertType.success, 5, 'alert-container');
    //   }, error: err =>
    //   {
    //     this.waiting = false;
    //     switch (err.status)
    //     {
    //       case 404:
    //         this.alertService.appendAlert('Tài khoản không tồn tại', AlertType.danger, 5, 'alert-container');
    //         break;

    //       case 400:
    //         this.alertService.appendAlert('Thông tin không hợp lệ, vui lòng kiểm tra lại', AlertType.danger, 5, 'alert-container');
    //         break;

    //       case 0:
    //         this.alertService.appendAlert('Không thể kết nối với máy chủ, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
    //         break;

    //       default:
    //         this.alertService.appendAlert('Đã xảy ra lỗi, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
    //         break;
    //     }
    //   }
    // });
  }

  uploadAvatar(inputEvent: any) {
    const file = inputEvent.target.files[0];
    const r = new FileReader();
    this.waiting = true;
    r.onloadend = (e) => {
      if (!e.target || !e.target.result || 'string' === typeof e.target.result)
        return;

      const fd = new FormData();
      fd.append('file', file);

      this.httpService.uploadAvatar(fd).subscribe({
        next: res => {
          this.waiting = false;
          this.alertService.appendAlert('Đổi ảnh đại diện thành công, tải lại trang để xem thay đổi', AlertType.success, 5, 'alert-container');
        },
        error: err => {
          this.waiting = false;
          switch (err.status) {
            case 0:
              this.alertService.appendAlert('Không thể kết nối với máy chủ, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
              break;

            default:
              this.alertService.appendAlert('Đã xảy ra lỗi, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
              break;
          }
        }
      });
    }

    r.readAsArrayBuffer(file);
  }

  changePassword(newPassword: string) {
    if (!newPassword)
      return;

    const data = {
      password: newPassword,
    };

    this.waiting = true;

    this.httpService.editUserInfo(data).subscribe({
      next: res => {
        this.waiting = false;
        this.alertService.appendAlert('Thay đổi mật khẩu thành công', AlertType.success, 5, 'alert-container');
      }, error: err => {
        this.waiting = false;
        switch (err.status) {
          case 400:
            this.alertService.appendAlert('Thông tin không hợp lệ, vui lòng kiểm tra lại', AlertType.danger, 5, 'alert-container');
            break;

          case 0:
            this.alertService.appendAlert('Không thể kết nối với máy chủ, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
            break;

          default:
            this.alertService.appendAlert('Đã xảy ra lỗi, vui lòng thử lại sau', AlertType.danger, 5, 'alert-container');
            break;
        }
      }
    });
  }

  logOut() {
    this.authGuardService.logOut();
    let navigateAfterLogOut = this.dataService.getData('navigateAfterLogOut');

    if (navigateAfterLogOut)
      navigateAfterLogOut(this.router);
  }

}


// logOut (router: Router)
// {
//   router.navigate(['home']);
// }

