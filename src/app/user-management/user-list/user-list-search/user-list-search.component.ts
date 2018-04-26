import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserDepartmentModel, UserQueryParamsModel} from '../../user-models/user-model';
import {UserService} from '../../user-services/user.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'wms-user-list-search',
  templateUrl: './user-list-search.component.html',
  styleUrls: ['./user-list-search.component.scss']
})
export class UserListSearchComponent implements OnInit {

  @Output() startSearch = new EventEmitter<UserQueryParamsModel>();

  searchForm: FormGroup;

  departmentList: UserDepartmentModel[] = [];

  createSearchForm() {
      this.searchForm = this.fb.group({
        account: [''],
        departmentId: [''],
      });
  }

  _search() {
      this.startSearch.emit(this.searchForm.value as UserQueryParamsModel);
  }

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

  constructor( private fb: FormBuilder,
               private us: UserService,
               private nzMessage: NzMessageService) { }

  ngOnInit() {
    this.createSearchForm();
    this.queryDepartments();
  }

}
