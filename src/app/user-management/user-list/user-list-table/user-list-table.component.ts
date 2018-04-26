import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {UserInfoModel, UserQueryParamsModel} from '../../user-models/user-model';
import {INIT_PAGE_PARAMS, PAGE_PARAM_INIT} from '../../../shared/models/page-params-init';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CheckedInfo, TableCheckboxService} from '../../../shared/common/table-checkbox.service';
import {UtilService} from '../../../shared/common/util.service';
import {UserService} from '../../user-services/user.service';
import {PageParams} from '../../../shared/models/Pagination';
import {Router} from '@angular/router';

@Component({
  selector: 'wms-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.scss'],
})
export class UserListTableComponent implements OnInit {

  _queryParams: UserQueryParamsModel;

  @Input()
  set queryParams(param: UserQueryParamsModel) {
    this._queryParams = param;
    this.queryUserList('search');
  }

  @Output('toEdit') _toEdit = new EventEmitter<string>();

  @Output('selected') _selected = new EventEmitter<Array<string>>();

  userList: UserInfoModel[] = [];

  _loading: boolean = false;

  queryUserList(flag?: string) {
    if(flag){
      this.pageParam.currentPage = 1;
    }

    this._loading = true;
    const _params = Object.assign({}, this.pageParam, this._queryParams);
    let _finalParams: UserQueryParamsModel = {};
    for(let [key, value] of Object.entries(_params)){
      if(key !== 'totalCount'){
        _finalParams[key] = value;
      }
    }

    this.us.getUserList(_finalParams).subscribe(
      (data) => {
        this.pageParam.totalCount = data.totalCount;
        this.userList = data.resultList;
        this._loading = false;
        this._checkOne();
      },
      (error) => {
        this._loading = false;
        this.nzMessage.error(error.message);
      }
    );
  }

  toEdit(e: Event, user:UserInfoModel) {
    e.stopPropagation();
    this._toEdit.emit(user.userId);
  }

  checkedInfo: CheckedInfo = {
    allCheck: false,
    indeterminate: false,
    selectedList: []
  };

  //单选
  _checkOne() {
    this.checkedInfo = this.tCheck.selectOne(this.userList);
    this.emitSelected()
  }

  //全选
  _checkAll(value) {
    this.checkedInfo = this.tCheck.selectAll(this.userList, value);
    this.emitSelected()
  }

  private emitSelected() {
    this._selected.emit(this.checkedInfo.selectedList.map(v => v.userId));
  }

  constructor(private tCheck: TableCheckboxService,
              private util: UtilService,
              @Inject('PAGE_PARAM_INIT') public pageParam,
              private us: UserService,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              ) {
    this.pageParam = Object.assign({}, this.pageParam);
  }

  ngOnInit() {
  }

}
