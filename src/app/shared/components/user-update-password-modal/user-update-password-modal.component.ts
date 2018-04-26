import {Component, Input, OnInit}         from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import * as md5                           from 'md5';
import {UserService}                      from '../../../user-management/user-services/user.service';

@Component({
  selector: 'wms-user-update-password-modal',
  template: `
    <div>
      <wms-user-update-password [fromFatherUserId]='_userId' (passwordEmitter)="emittedPassword($event);"></wms-user-update-password>
    </div>
    <div class="customize-footer">
      <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="cancel()">
        取  消
      </button>
      &nbsp;&nbsp;&nbsp;
      <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="submit()" [nzLoading]="isLoading" [disabled]="!password || !userId">
        确  定
      </button>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .customize-footer {
        border-top: 1px solid #e9e9e9;
        padding: 10px 18px 0 10px;
        text-align: right;
        border-radius: 0 0 0px 0px;
        margin: 15px -16px -5px -16px;
      }
    `
  ]
})
export class UserUpdatePasswordModalComponent implements OnInit {
  _userId: string;

  @Input()
  set userId(param) {
    this._userId = param;
  }

  get userId() {
    return this._userId;
  }

  password: string = '';

  isLoading: boolean = false;

  emittedPassword(passwordForm) {
    this.password = passwordForm.value;
  }

  submit() {
    this.isLoading = true;
    this.us.updateUserPassword(this.userId, md5(this.password)).subscribe(
      (data) => {
        if (data) {
          this.nzMessage.success('密码修改成功!');
          this.isLoading = false;
          this.subject.destroy();
        }
      },
      (error) => {
        this.isLoading = false;
        this.nzMessage.error(error.message);
      }
    );
  }

  cancel() {
    this.subject.destroy('onCancel');
  }

  constructor(private subject: NzModalSubject, private us: UserService, private nzMessage: NzMessageService) { }

  ngOnInit() {
  }

}
