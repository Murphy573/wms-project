import {Component, Inject, OnInit}                                                                 from '@angular/core';
import {FormBuilder, FormGroup}                                                                    from '@angular/forms';
import {UtilService}                                                                               from '../../shared/common/util.service';
import {AssetService}                                                                              from '../asset-services/asset.service';
import {
  PAGE_PARAM_INIT
}                                                                                                  from '../../shared/models/page-params-init';
import {
  AssetBorrowModel, AssetInfoModel, AssetQueryParamsModel, AssetStatusModel, AssetTypeModel,
  AssetExportParams, AssetDetailParams
} from '../asset-models/asset-model';
import {
  CheckedInfo,
  TableCheckboxService
}                                                                                                  from '../../shared/common/table-checkbox.service';
import {NzMessageService, NzModalService}                                                          from 'ng-zorro-antd';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit {

  searchGroup: FormGroup;

  statusList: Array<AssetStatusModel> = [];

  typeList: Array<AssetTypeModel> = [];

  assetList: Array<AssetInfoModel> = [];

  _loading = false;//请求表格数据时是否显示loading

  //构建搜索form
  createSearchForm() {
    this.searchGroup = this.fb.group({
      name: [''],
      assetCode: [''],
      statusId: [''],
      typeId: [''],
      startTime: [null],
      endTime: [null],
      owner: ['']
    });
  }

  queryTypeList() {
    this.as.getAssetTypeList().subscribe(
      (data) => {
        this.typeList = data as Array<AssetTypeModel>;

      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  queryStatusList() {
    this.as.getAssetStatus().subscribe(
      (data) => {
        this.statusList = data as Array<AssetStatusModel>;
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  //点击查询
  _search(flag) {
    this.queryAssetList(flag);
  }

  //获取所有资产列表
  queryAssetList(flag?) {
    if (flag === 'search' && !flag) {
      this.pageParam.currentPage = 1;
    }
    this._loading = true;
    const _params = Object.assign({}, this.pageParam, this.searchGroup.value);
    let _finalParams: AssetQueryParamsModel = {};
    for (let [key, value] of Object.entries(_params)) {
      if (key !== 'totalCount') {
        _finalParams[key] = value;
      }
    }

    this.as.getAssetList(_finalParams).subscribe(
      (data) => {
        this.pageParam.totalCount = data.totalCount;
        this.assetList = data.resultList;
        this._loading = false;
        this._checkOne();
      },
      (error) => {
        this._loading = false;
        this.nzMessage.error(error.message);
      }
    )
  }

  deleteAssets() {
    this.nzModal.confirm({
      content: '确定要删除选中的资产吗?',
      okText: '确定',
      cancelText: '取消',
      showConfirmLoading: true,
      onOk: () => {
        return new Promise((resolve, reject) => {
          let _checkAssetCodes: string[] = this.checkedInfo.selectedList.map(v => v.assetCode);
          this.as.deleteAssets(_checkAssetCodes).then(
            (data: boolean) => {
              if (data) {
                this.queryAssetList();
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

  assetExportInfoParam:AssetExportParams = {
    assetCodes:[],
    condition:{
      name: '',
    assetCode: '',
    statusId: '',
    typeId:'',
    startTime:new Date,
    endTime:new Date,
    owner:''
    }
  }


  assetExportConfirm(){
    this.nzModal.confirm({
      content: '确定要导出选中的资产吗?',
      okText: '确定',
      cancelText: '取消',
      showConfirmLoading: true,
      onOk: () => {
                this.assetExportInfoParam.assetCodes = this.checkedInfo.selectedList.map(v => v.assetCode);
                this.assetExportInfoParam.condition.name = this.searchGroup.value.name;
                    this.assetExportInfoParam.condition.assetCode = this.searchGroup.value.assetCode;
                    this.assetExportInfoParam.condition.statusId = this.searchGroup.value.statusId;
                    this.assetExportInfoParam.condition.typeId = this.searchGroup.value.typeId;
                    this.assetExportInfoParam.condition.startTime = this.searchGroup.value.startTime;
                    this.assetExportInfoParam.condition.endTime = this.searchGroup.value.endTime;
                    this.assetExportInfoParam.condition.owner = this.searchGroup.value.owner;
                    this.as.assetExport(this.assetExportInfoParam).subscribe(
                        (data) => {
                          this.nzMessage.success("导出成功");
                        },
                        (error) => {
                          this.util.exportFile('zichan', error as ArrayBuffer);
                        }
                    )

      }
    })
  }

  assetImportConfirm(event){
    this.nzModal.confirm({
      content: '确定要导入选中的资产吗?',
      okText: '确定',
      cancelText: '取消',
      showConfirmLoading: true,
      onOk: () => {
          let fileList: FileList = event.target.files;
          let file:File = fileList[0];
          let formData:FormData = new FormData();
          formData.append('uploadFile',file,file.name);
        this.as.assetImport(formData).subscribe(
            (data) => {
              this.nzMessage.success("导入成功");
            },
            (error) => {
              this.nzMessage.error(error.message);
            }
        )

      }
    })
  }


  //打开借出模态框
  isBorrowModalVisible: boolean = false;
  isBorrowConfirmLoading: boolean = false;
  assetBorrowObj: AssetBorrowModel = {
    assetCode: '',
    assetStatusId: '2',
    name: '',
    ownerDepartment:''
  };

  openBorrowModal(data: AssetInfoModel) {
    if (data.statusId === '3') {//空闲状态，点击借出
      this.isBorrowModalVisible = true;
      this.assetBorrowObj.assetCode = data.assetCode;
    }
    else if (data.statusId === '2') {//借出状态，点击还回
      this.returnAsset(data);
    }
  }

  closeBorrowModal() {
    this.isBorrowModalVisible = false;
    this.assetBorrowObj.assetCode = '';
    this.assetBorrowObj.name = '';
    this.assetBorrowObj.ownerDepartment=''
  }

  //借出
  borrowAsset() {
    this.nzModal.confirm({
      content: `确认是' ${this.assetBorrowObj.name} '借出该资产吗?`,
      okText: '确定',
      cancelText: '取消',
      zIndex: 1002,
      onOk: () => {
        return new Promise((resolve, reject) => {
          resolve();
          this.isBorrowConfirmLoading = true;
          this.as.borrowAndReturnAsset(this.assetBorrowObj).subscribe(
            (data) => {
              if (data) {
                this.isBorrowConfirmLoading = false;
                this.closeBorrowModal();
                this.queryAssetList();
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

  //还回
  returnAsset(data: AssetInfoModel) {
    this.nzModal.confirm({
      content: `确认归还该资产吗?`,
      okText: '确定',
      cancelText: '取消',
      zIndex: 1002,
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.as.borrowAndReturnAsset({assetCode: data.assetCode, assetStatusId: '3'}).subscribe(
            (data) => {
              if (data) {
                this.queryAssetList();
                resolve();
              }
            },
            (error) => {
              this.nzMessage.error(error.message);
              resolve();
            }
          );
        });
      }
    });
  }


  /*
  *资产明细模态框
  */

  assetDetailList:Array<AssetDetailParams> = [];
  isAssetDetailVisible: boolean = false;
  //isAssetDetailLoading: boolean = false;
  openAssetDetailModal(param){
    this.isAssetDetailVisible=true;
    this.as.assetDetail({assetCode:param}).subscribe(
        (data)=>{
           this.assetDetailList = data as Array<AssetDetailParams>;
        },
        (error)=>{
          this.nzMessage.error(error.message);
        }
    )
  };

  closeAssetDetailModal() {
    this.isAssetDetailVisible=false;
  }



  ValidateStatus(isDirty): string {
    if (!isDirty) {
      return '';
    }
    else {
      if (this.assetBorrowObj.name) {
        return 'success';
      }
      return 'error';
    }
  }
  ValidatePartStatus(isDirty): string {
    if (!isDirty) {
      return '';
    }
    else {
      if (this.assetBorrowObj.ownerDepartment) {
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
    this.checkedInfo = this.tCheck.selectOne(this.assetList);
  }

  //全选
  _checkAll(value) {
    this.checkedInfo = this.tCheck.selectAll(this.assetList, value)
  }

  constructor(private fb: FormBuilder,
              private tCheck: TableCheckboxService,
              private util: UtilService,
              private as: AssetService,
              @Inject('PAGE_PARAM_INIT') public pageParam,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private ar:ActivatedRoute
              ) {

    this.pageParam = Object.assign({}, this.pageParam);
  }

  /*系统管理员*/
  userType:string='';
  ngOnInit() {
    this.createSearchForm();
    this.queryTypeList();
    this.queryStatusList();
    this.queryAssetList();
    this.ar.queryParams.subscribe(queryParams=>{
       this.userType=queryParams.userType;
    })

  }
}
