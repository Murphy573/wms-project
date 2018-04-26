import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators}             from '@angular/forms';
import {UserDepartmentModel, UserInfoModel}             from '../user-models/user-model';
import {UserService}                                    from '../user-services/user.service';
import {NzMessageService, NzModalService}               from 'ng-zorro-antd';
import * as md5                                         from 'md5';
import {UserUpdatePasswordModalComponent}               from '../../shared/components/user-update-password-modal/user-update-password-modal.component';

@Component({
  selector: 'wms-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  _userId: string;
  @Input()
  set userId(userId: string) {
    this._userId = userId;


    if(userId !== '') {
      this.us.getUser(this._userId).subscribe(
        (data) => {
          if(data) {
            this.createUserForm(data);
          }
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
      );
    }
    else {
      this.createUserForm({
        userId: '',
        account: '',
        password: '',
        userTypeId: '2',
        departmentId: '',
        phone: '',
        otherConnect: '',
        comment: ''
      });
    }
  };
  @Output() formSubmit: EventEmitter<UserInfoModel> = new EventEmitter<UserInfoModel>();

  passwordComponent = {
    password: '',
  };

  updatePasswordFormComponent(passwordForm) {
    if(passwordForm.status) {
      this.userForm.markAsDirty();
    }
    this.passwordComponent.password = passwordForm.value;
  }

  userForm: FormGroup;

  departmentList: UserDepartmentModel[] = [];

  queryDepartments() {
    this.us.getDepartments().subscribe(
      (data) => {
        this.departmentList = data;
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  submitForm = ($event) => {
    $event.preventDefault();
    for (const key in this.userForm.controls) {
      this.userForm.controls[key].markAsDirty();
    }

    let _form = Object.assign({}, this.userForm.value, this.passwordComponent);

    if(this._userId === ''){
      _form.password = md5(_form.password);
    }
    else {
      delete _form.password;
    }
    this.formSubmit.emit(_form as UserInfoModel);
  };

  //获取formcontrol
  getFormControl(name) {
    return this.userForm.controls[name];
  }

  //构建用户表单
  createUserForm(user: UserInfoModel) {
    this.userForm = this.fb.group({
      userId: [user.userId],
      account: [user.account, [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
      userTypeId: [user.userTypeId],
      departmentId: [user.departmentId, [Validators.required]],
      phone: [user.phone, [Validators.maxLength(40)]],
      otherConnect: [user.otherConnect, [Validators.maxLength(40)]],
      comment: [user.comment, [Validators.maxLength(300)]]
    });
    this.queryDepartments();
  }

  openUpdatePasswordModal() {
    this.modalService.open({
      title: '修改密码',
      content: UserUpdatePasswordModalComponent,
      footer: false,
      componentParams: {
        userId: this._userId
      }
    });
  }

  //是否可以提交
  isCanSubmit() {
    if(this._userId === '') {
      return this.userForm.invalid || this.passwordComponent.password === '' || this.userForm.controls['departmentId'].value === '';
    }
    return this.userForm.invalid || this.userForm.controls['departmentId'].value === '';
  }

  constructor(private fb: FormBuilder, private us: UserService, private nzMessage: NzMessageService, private modalService: NzModalService) {};

  ngOnInit() {

  }

}
