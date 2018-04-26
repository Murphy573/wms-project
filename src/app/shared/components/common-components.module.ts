/**
 * write by @pengfei.li
 */
import {NgModule}                         from '@angular/core';
import {GroupViewComponent}               from './group-view/group-view.component';
import {CommonModule}                     from '@angular/common';
import {NgZorroAntdModule}                from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserUpdatePasswordComponent}      from './user-update-password/user-update-password.component';
import {UserUpdatePasswordModalComponent} from './user-update-password-modal/user-update-password-modal.component';
import {UserService}                      from '../../user-management/user-services/user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  providers: [UserService],
  declarations: [GroupViewComponent, UserUpdatePasswordComponent, UserUpdatePasswordModalComponent],
  exports: [GroupViewComponent, UserUpdatePasswordComponent, UserUpdatePasswordModalComponent],
  entryComponents: [UserUpdatePasswordModalComponent]
})
export class CommonComponentsModule {}
