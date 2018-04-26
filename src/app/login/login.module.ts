import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  exports: [],
  providers: [LoginService]
})
export class LoginModule { }
