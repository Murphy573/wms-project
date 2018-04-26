/**
 * write by @pengfei.li
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserMgrComponent} from './user-mgr/user-mgr.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserInfoGuardService} from './user-services/userInfo-guard.service';

const routes: Routes = [
  {
    path: '',
    component: UserMgrComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
        data: {
          breadCrumbs: [
            {
              title: '用户管理',
              routerLink: '/main/user-management'
            }
          ],
          menuKeyword: 'user-management'
        }
      },
      {
        path: 'user-add',
        component: UserAddComponent,
        data: {
          breadCrumbs: [
            {
              title: '用户管理',
              routerLink: '/main/user-management'
            },
            {
              title: '新建用户',
              routerLink: '/main/user-management/user-add'
            }
          ],
          menuKeyword: 'user-management'
        },
        canDeactivate: [UserInfoGuardService]
      },
      {
        path: 'user-edit',
        component: UserEditComponent,
        data: {
          breadCrumbs: [
            {
              title: '用户管理',
              routerLink: '/main/user-management'
            },
            {
              title: '编辑用户',
              routerLink: '/main/user-management/user-edit'
            }
          ],
          menuKeyword: 'user-management'
        },
        canDeactivate: [UserInfoGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRouting {}
