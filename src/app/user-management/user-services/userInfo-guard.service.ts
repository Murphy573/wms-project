/**
 * write by @pengfei.li
 */
import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {UserAddComponent} from '../user-add/user-add.component';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {NzModalService} from 'ng-zorro-antd';


@Injectable()
export class UserInfoGuardService implements CanDeactivate<UserAddComponent | UserEditComponent> {

  constructor(private nzModal: NzModalService) {}

  canDeactivate(component: UserAddComponent | UserEditComponent): Promise<boolean> | boolean {
    if(component.userInfo.userForm.dirty) {
      if(!!component.userInfoData) {
        return true;
      }
      else {
        return new Promise((resolve, reject) => {
          this.nzModal.confirm({
            title: component.userId ? '修改用户': '新增用户',
            content: '是否放弃当前操作?',
            onOk: () => {
              resolve(true);
              return Promise.resolve();
            },
            onCancel: () => {
              resolve(false);
            }
          });
        });
      }
    }
    else {
      return true;
    }
  }

}
