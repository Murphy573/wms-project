import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {OfficeSupService} from '../OfficeSup-services/OfficeSup.service';
import {UtilService} from '../../shared/common/util.service';
import {PageParams} from '../../shared/models/Pagination';
import {INIT_PAGE_PARAMS, PAGE_PARAM_INIT} from '../../shared/models/page-params-init';
import {
  OfficeSupStatusModel, OfficeSupTypeModel, OfficeSupInfoModel,
  OfficeSupQueryParamsModel, OfficeSupReceiveModel
} from "../OfficeSup-models/OfficeSup-model";
import {CheckedInfo, TableCheckboxService} from '../../shared/common/table-checkbox.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-OfficeSup-list',
  templateUrl: 'OfficeSup-list.component.html',
  styleUrls: ['OfficeSup-list.component.scss']
})
export class OfficeSupListComponent implements OnInit {

  searchGroup: FormGroup;

  statusList: Array<OfficeSupStatusModel> = [];

  typeList: Array<OfficeSupTypeModel> = [];

  OfficeSupList: Array<OfficeSupInfoModel> = [];

  _loading = false;//请求表格数据时是否显示loading

  //构建搜索form
  createSearchForm() {
    this.searchGroup = this.fb.group({
      name: [''],
      officeSupId: [''],
      statusId: [''],
      typeId: [''],
      startTime: [null],
      endTime: [null],
      owner: ['']
    });
  }

  queryTypeList() {
    this.ms.getOfficeSupTypeList().subscribe(
        (data) => {
          this.typeList = data as Array<OfficeSupTypeModel>;

        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  queryStatusList() {
    this.ms.getOfficeSupStatus().subscribe(
        (data) => {
          this.statusList = data as Array<OfficeSupStatusModel>;
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  //点击查询
  _search(flag) {
    this.queryOfficeSupList(flag);
  }

  //获取所有资产列表
  queryOfficeSupList(flag?) {
    if(flag === 'search' && !flag) {
      this.pageParam.currentPage = 1;
    }
    this._loading = true;
    const _params = Object.assign({}, this.pageParam, this.searchGroup.value);
    let _finalParams: OfficeSupQueryParamsModel = {};
    for(let [key, value] of Object.entries(_params)){
      if(key !== 'totalCount'){
        _finalParams[key] = value;
      }
    }

    this.ms.getOfficeSupList(_finalParams).subscribe(
        (data) => {
          this.pageParam.totalCount = data.totalCount;
          this.OfficeSupList = data.resultList;
          this._loading = false;
          this._checkOne();
        },
        (error) => {
          this._loading = false;
          this.nzMessage.error(error.message);
        }
    )
  }

  deleteOfficeSup() {
    this.nzModal.confirm({
      content: '确定要删除选中的资产吗?',
      okText: '确定',
      cancelText: '取消',
      showConfirmLoading: true,
      onOk: () => {
        return new Promise((resolve, reject) => {
          let _checkAssetCodes: string[] = this.checkedInfo.selectedList.map( v => v.officeSupId );
          this.ms.deleteOfficeSup(_checkAssetCodes).then(
              (data: boolean) => {
                if(data) {
                  this.queryOfficeSupList();
                }
                resolve();
              }
          )
              .catch((error) => {
                console.log(error);
                this.nzMessage.error(error.message);
                resolve();
              })
        })
      }
    });
  }

  isBorrowModalVisible: boolean = false;
  isBorrowConfirmLoading: boolean = false;
  OfficeSupReceiveObj: OfficeSupReceiveModel = {
    officeSupId:'', //领用办公用品ID
    user:'',  //领用人
    number:1, //领用数量
    receiveTime:new Date(), //领用日期
    remark:'', //备注
  };

  openReceiveModal(data: OfficeSupInfoModel) {
    if(data.officeSupId){
      this.isBorrowModalVisible = true;
      this.OfficeSupReceiveObj.officeSupId=data.officeSupId;
    }

    }


  closeReceiveModal() {
    this.isBorrowModalVisible = false;
    this.OfficeSupReceiveObj.user = '';
    this.OfficeSupReceiveObj.number=1;
    this.OfficeSupReceiveObj.remark = '';
  }

  /*
  * 打开办公用品明细
  * */
  officeSupDetailList : Array<OfficeSupReceiveModel>=[];
  isOfficeDetailVisible:boolean = false;
  openOfficeSupDetail(officeParam){
    if(officeParam) {
      this.isOfficeDetailVisible = true;
      this.ms.OfficeSupDetail({officeSupId: officeParam}).subscribe(
          (data) => {
            this.officeSupDetailList = data as Array<OfficeSupReceiveModel>;
          },
          (error) => {
            this.nzMessage.error(error.message);
          }
      )
    }
  }

  closeOfficeDetailModal(){
    this.isOfficeDetailVisible = false;
  }



  //确认提交
  OfficeSupReceiveSubmit() {
    this.nzModal.confirm({
      content: `确认提交吗?`,
      okText: '确定',
      cancelText: '取消',
      zIndex: 1002,
      onOk: () => {
        return new Promise((resolve, reject) => {
          resolve();
          this.isBorrowConfirmLoading = true;
          this.ms.borrowAndReturnAsset(this.OfficeSupReceiveObj).subscribe(
              (data) => {
                if (data) {
                  this.isBorrowConfirmLoading = false;
                  this.closeReceiveModal();
                  this.queryOfficeSupList();
                }
              },
              (error) => {
                this.isBorrowConfirmLoading = false;
                this.nzMessage.error(error.message);
              }
          );
        });
      }
    });
  }



  OfficeSupValidateStatus(isDirty): string {
    if (!isDirty) {
      return '';
    }
    else {
      if (this.OfficeSupReceiveObj.user) {
        return 'success';
      }
      return 'error';
    }
  }


  checkedInfo: CheckedInfo = {
    allCheck: false,
    indeterminate: false,
    selectedList: []
  };

  //单选
  _checkOne() {
    this.checkedInfo = this.tCheck.selectOne(this.OfficeSupList);
  }

  //全选
  _checkAll(value) {
    this.checkedInfo = this.tCheck.selectAll(this.OfficeSupList, value)
  }

  constructor(private fb: FormBuilder,
              private tCheck: TableCheckboxService,
              private util: UtilService,
              private ms: OfficeSupService,
              @Inject('PAGE_PARAM_INIT') public pageParam,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private ar:ActivatedRoute) {
    this.pageParam = Object.assign({}, this.pageParam);
  }

  formatterInt = value => value ? Math.abs(parseInt(value, 10)) : null;
  parserInt = value => Math.abs(parseInt(value, 10));

  userType:string;
  ngOnInit() {
    this.createSearchForm();
    this.queryTypeList();
    this.queryStatusList();
    this.queryOfficeSupList();
    this.ar.queryParams.subscribe(queryParams=>{
      this.userType = queryParams.userType;
    })
  }

}
