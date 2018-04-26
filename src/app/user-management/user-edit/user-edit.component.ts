import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInfoModel} from '../user-models/user-model';
import {UserService} from '../user-services/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {UserInfoComponent} from '../user-info/user-info.component';

@Component({
  selector: 'wms-user-edit',
  template: '<wms-user-info [userId]="userId" (formSubmit)="editUser($event)"></wms-user-info>',
  styles: ['']
})
export class UserEditComponent implements OnInit {

  @ViewChild(UserInfoComponent) userInfo: UserInfoComponent;

  userId: string;

  userInfoData: UserInfoModel;

  editUser(user: UserInfoModel) {
    this.userInfoData = user;
    this.us.editUser(this.userInfoData).subscribe(
      (data: boolean) => {
        if(data) {
          this.nzMessage.success('用户编辑成功!');
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

  constructor(private activeRoute: ActivatedRoute, private us: UserService, private nzMessage: NzMessageService, private router: Router) { }


  ngOnInit() {
    this.userId = this.activeRoute.snapshot.queryParams['userId'];
  }

}
