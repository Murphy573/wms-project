import { Component, OnInit }                                 from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router}                                              from '@angular/router';
import {LoginService}                                        from '../login.service';
import {SessionService}                                      from '../../shared/common/session.service';
import * as MD5                                              from 'md5';
import {LoginInfo}                                           from '../login.model';


@Component({
  selector: 'wms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  _loading: boolean = false;

  errorMsg: string;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    if(this.validateForm.valid){
      this._loading = true;

      let _loginInfo: LoginInfo = Object.assign({}, this.validateForm.value as LoginInfo);
      _loginInfo.password = MD5(_loginInfo.password);

      this.si.login(_loginInfo).subscribe(
        data => {
          this._loading = false;
          this.ss.setLoginSession(data);
          this.route.navigate(['./main'],{
            queryParams:
                {userType:data.userType}
          });
        },
        (error) => {
          this._loading = false;
          this.errorMsg = error.message;
        }
      );

    }
  }

  getFormControl(key: string): AbstractControl {
    return this.validateForm.controls[key];
  }

  createForm ():void {
    this.validateForm = this.fb.group({
      account: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
    });
  }

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private ss: SessionService,
    private si: LoginService
  ) { }

  ngOnInit() {
    this.createForm();
    this.ss.removeLoginSession()
  }

}
