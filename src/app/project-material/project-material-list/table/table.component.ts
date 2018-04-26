import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {UserInfoModel, UserQueryParamsModel} from '../../../user-management/user-models/user-model';
import {NzMessageService, NzModalService}  from 'ng-zorro-antd';
import {UtilService}                       from '../../../shared/common/util.service';
import {TableCheckboxService} from '../../../shared/common/table-checkbox.service';
import {ProjectMaterialService}            from '../../services/project-material.service';
import {ProjectMaterialInfo}               from '../../project-material-models';
import {AssetQueryParamsModel}             from '../../../asset-management/asset-models/asset-model';

@Component({
  selector: 'wms-project-material-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  _queryParams: AssetQueryParamsModel;

  @Input()
  set queryParams(param: AssetQueryParamsModel) {
    this._queryParams = param;
    this.queryProjectMaterialList('search');
  }

  @Output('toEdit') _toEdit = new EventEmitter<string>();

  projectMaterialList: ProjectMaterialInfo[] = [];

  _loading: boolean = false;

  queryProjectMaterialList(flag?: string) {
    if(flag){
      this.pageParam.currentPage = 1;
    }

    this._loading = true;
    const _params = Object.assign({}, this.pageParam, this._queryParams);
    let _finalParams: AssetQueryParamsModel = {};
    for(let [key, value] of Object.entries(_params)){
      if(key !== 'totalCount'){
        _finalParams[key] = value;
      }
    }


    this.pjs.getProjectMaterialList(_finalParams).subscribe(
      (data) => {
        this.pageParam.totalCount = data.totalCount;
        this.projectMaterialList = data.resultList;
        this._loading = false;
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


  constructor(private tCheck: TableCheckboxService,
              @Inject('PAGE_PARAM_INIT') public pageParam,
              private pjs: ProjectMaterialService,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
  ) {
    this.pageParam = Object.assign({}, this.pageParam);
  }

  ngOnInit() {
  }

}
