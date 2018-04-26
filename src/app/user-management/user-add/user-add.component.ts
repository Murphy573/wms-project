import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserInfoModel} from '../user-models/user-model';
import {UserService} from '../user-services/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {UserInfoComponent} from '../user-info/user-info.component';

@Component({
  selector: 'wms-user-add',
  template: '<wms-user-info [userId]="userId" (formSubmit)="addUser($event)"></wms-user-info>',
  styles: ['']
})
export class UserAddComponent implements OnInit {

  @ViewChild(UserInfoComponent) userInfo: UserInfoComponent;

  userId: string = '';

  userInfoData: UserInfoModel;

  addUser(user: UserInfoModel) {
    this.userInfoData = user;
    this.us.addUser(this.userInfoData).subscribe(
      (data: boolean) => {
        if(data) {
          this.nzMessage.success('用户添加成功!');
          this.router.navigate(['/main/user-management']);
          return;
        }
      },
      (error) => {
        this.userInfoData = null;
        this.nzMessage.error(error.message);
      }
    );
  }

  constructor( private us: UserService, private nzMessage: NzMessageService, private router: Router) { }

  ngOnInit() {
  }

}
