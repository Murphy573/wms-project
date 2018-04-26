import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'wms-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.scss']
})
export class UserUpdatePasswordComponent implements OnInit {


  @Output() passwordEmitter: EventEmitter<object> = new EventEmitter<object>();

  passwordForm: FormGroup;

  _fromFatherUserId?:string;
  @Input()
  set fromFatherUserId(userId: string) {
    this._fromFatherUserId = userId;
  }

  //获取formcontrol
  getFormControl(name) {
    return this.passwordForm.controls[name];
  }

  //输入密码时验证是否与确认密码一致
  validateConfirmPassword() {
    setTimeout(_ => {
      this.passwordForm.controls['passwordConfirmation'].updateValueAndValidity();
    })
  }

  //确认密码验证
  passwordConfirmationValidator = (control: FormControl): { [key: string]: boolean } => {
    let _status = this.passwordForm ? this.passwordForm.dirty : false;

    if (!control.value) {
      this.passwordEmitter.emit( { status: _status, value: '' });
      return {required: true};
    } else if (this.passwordForm && control.value !== this.passwordForm.controls['password'].value) {
      this.passwordEmitter.emit({ status: _status, value: '' });
      return {confirm: true, error: true};
    }
    else {
      if(this.passwordForm.controls['password'].invalid) {
        this.passwordEmitter.emit({ status: _status, value: '' });
        return;
      }
      this.passwordEmitter.emit({ status: _status, value: this.passwordForm.controls['password'].value });
    }
  };

  //显示密碼与隐藏密码
  //judgePaw?:string;
  originalJudgePaw='password';
  firstPaw='password';
  confirmPaw='password';
  showPaw(pawParam){
    if(pawParam==="originalPaw"){
      this.originalPawFun();
    }else if(pawParam==="firstPaw"){
      this.firstPawFun();
    }else if(pawParam==="confirmPaw"){
      this.confirmPawFun();
    }
  }

  originalPawFun(){
    if(this.originalJudgePaw==="password"){
      this.originalJudgePaw="text";
    }else{
      this.originalJudgePaw="password";
    }
  }
  firstPawFun(){
    if(this.firstPaw==="password"){
      this.firstPaw="text";
    }else{
      this.firstPaw="password";
    }
  }
  confirmPawFun(){
    if(this.confirmPaw==="password"){
      this.confirmPaw="text";
    }else{
      this.confirmPaw="password";
    }
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.minLength(6), Validators.maxLength(13)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(13)]],
      passwordConfirmation: ['', [this.passwordConfirmationValidator]],
    });
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createPasswordForm();
  }

}
