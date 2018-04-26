import { Component, OnInit }              from '@angular/core';
import {SessionService}                   from '../../shared/common/session.service';
import {Router}                           from '@angular/router';
import {LoginToken}                       from '../../login/login.model';
import {MainService}                      from '../main.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserUpdatePasswordModalComponent} from '../../shared/components/user-update-password-modal/user-update-password-modal.component';

@Component({
  selector: 'wms-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})


export class UserBarComponent implements OnInit {

  constructor( private ss: SessionService,
               private router: Router,
               private ms: MainService,
               private nzMessage: NzMessageService,
               private nzModal: NzModalService) { }

  userInfo: LoginToken;

  getUserInfo() {
    this.userInfo = this.ss.getLoginSession();
  }

  navigator() {
    this.router.navigate(['/main/user-management/user-edit'], {queryParams: {
        userId: this.userInfo.id
      }});
  }

  logOut() {
    this.ms.logout().subscribe(
      (data) => {
        if(data) {
          this.router.navigate(['./login']);
        }
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  openUpdatePasswordModal () {
    this.nzModal.open({
      title: '修改密码',
      content: UserUpdatePasswordModalComponent,
      footer: false,
      componentParams: {
        userId: this.userInfo.id
      }
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
