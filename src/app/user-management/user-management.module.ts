import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMgrComponent } from './user-mgr/user-mgr.component';
import {UserManagementRouting} from './user-management.routing';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserListSearchComponent } from './user-list/user-list-search/user-list-search.component';
import {UserService} from './user-services/user.service';
import { UserListTableComponent }           from './user-list/user-list-table/user-list-table.component';
import { UserAddComponent }                 from './user-add/user-add.component';
import { UserEditComponent }                from './user-edit/user-edit.component';
import { UserInfoComponent }                from './user-info/user-info.component';
import {UserInfoGuardService}               from './user-services/userInfo-guard.service';
import {CommonComponentsModule}             from '../shared/components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRouting,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentsModule
  ],
  declarations: [UserMgrComponent, UserListComponent, UserListSearchComponent, UserListTableComponent, UserAddComponent, UserEditComponent, UserInfoComponent],
  exports: [],
  providers: [UserService, UserInfoGuardService],
  entryComponents: []
})
export class UserManagementModule { }
