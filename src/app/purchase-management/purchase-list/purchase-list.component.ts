import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {PurchaseInfoModel,PurchaseQueryParamsModel, PurchaseStatusModel, PurchaseTypeModel} from "../purchase-models/purchase-model";
import {TableCheckboxService, CheckedInfo} from "../../shared/common/table-checkbox.service";
import {UtilService} from "../../shared/common/util.service";
import {PurchaseService} from "../purchase-services/purchase-service";
import {NzModalService, NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  searchGroup: FormGroup;

  statusList: Array<PurchaseStatusModel> = [];

  typeList: Array<PurchaseTypeModel> = [];

  purchaseList: Array<PurchaseInfoModel> = [];

  _loading = false;//请求表格数据时是否显示loading

  //构建搜索form
  createSearchForm() {
    this.searchGroup = this.fb.group({
      name: [''],
      statusId: [''],
      typeId: [''],
      supplier:[''],
      startTime: [null],
      endTime: [null],
      purchaser: ['']
    });
  }

  queryTypeList() {
    this.ps.getPurchaseTypeList().subscribe(
        (data) => {
          this.typeList = data as Array<PurchaseTypeModel>;

        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  queryStatusList() {
    this.ps.getPurchaseStatus().subscribe(
        (data) => {
          this.statusList = data as Array<PurchaseStatusModel>;
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  //点击查询
  _search(flag) {
    this.queryPurchaseList(flag);
  }

  //获取所有资产列表
  queryPurchaseList(flag?) {
    if (flag === 'search' && !flag) {
      this.pageParam.currentPage = 1;
    }
    this._loading = true;
    const _params = Object.assign({}, this.pageParam, this.searchGroup.value);
    let _finalParams: PurchaseQueryParamsModel = {};
    for (let [key, value] of Object.entries(_params)) {
      if (key !== 'totalCount') {
        _finalParams[key] = value;
      }
    }

    this.ps.getPurchaseList(_finalParams).subscribe(
        (data) => {
          this.pageParam.totalCount = data.totalCount;
          this.purchaseList = data.resultList;
          this._loading = false;
          this._checkOne();
        },
        (error) => {
          this._loading = false;
          this.nzMessage.error(error.message);
        }
    )
  }

  deletePurchase() {
    this.nzModal.confirm({
      content: '确定要删除选中的资产吗?',
      okText: '确定',
      cancelText: '取消',
      showConfirmLoading: true,
      onOk: () => {
        return new Promise((resolve, reject) => {
          let _checkAssetCodes: string[] = this.checkedInfo.selectedList.map(v => v.purchaseBatch);
          this.ps.deletePurchase(_checkAssetCodes).then(
              (data: boolean) => {
                if (data) {
                  this.queryPurchaseList();
                }
                resolve();
              }
          )
              .catch((error) => {
                this.nzMessage.error(error.message);
                resolve();
              })
        })
      }
    });
  }


  checkedInfo: CheckedInfo = {
    allCheck: false,
    indeterminate: false,
    selectedList: []
  };


  //单选
  _checkOne() {
    this.checkedInfo = this.tCheck.selectOne(this.purchaseList);
  }

  //全选
  _checkAll(value) {
    this.checkedInfo = this.tCheck.selectAll(this.purchaseList, value)
  }

  constructor(private fb: FormBuilder,
              private tCheck: TableCheckboxService,
              private util: UtilService,
              private ps: PurchaseService,
              @Inject('PAGE_PARAM_INIT') public pageParam,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private ar:ActivatedRoute) {

    this.pageParam = Object.assign({}, this.pageParam);
  }

  userType:string;
  ngOnInit() {
    this.createSearchForm();
    this.queryTypeList();
    this.queryStatusList();
    this.queryPurchaseList();
    this.ar.queryParams.subscribe(queryParams=>{
      this.userType=queryParams.userType;
    })
  }
}
