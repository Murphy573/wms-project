import {Component, EventEmitter, Input, OnDestroy, OnInit, Output}                from '@angular/core';
import {AssetContent, AssetService}                                               from '../asset-services/asset.service';
import {Observable}                                                               from 'rxjs/Observable';
import {AssetInfoModel, AssetSourceTypeModel, AssetSourceTypes, AssetStatusModel} from '../asset-models/asset-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService}                                from 'ng-zorro-antd';
import {ProjectInfo}                                     from '../../project-material/project-material-models';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import {Observer}                                        from 'rxjs/Observer';
import {Subscription}                                    from 'rxjs/Subscription';
import {PurchaseInfo} from "../../OfficeSup-management/OfficeSup-models/OfficeSup-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-asset-info',
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit, OnDestroy {

  _assetCode: string;

  assetForm: FormGroup;

  @Output() formSubmit: EventEmitter<AssetInfoModel> = new EventEmitter<AssetInfoModel>();

  @Input()
  set assetCode(code: string) {
    this._assetCode = code;

    if (code !== '') {
      this.queryAssetInfo().subscribe(
        (data) => {
          this.createAssetForm(data.assetInfoVO);
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
      );
    }
    else {
      this.createAssetForm(this.initAssetInfo());
    }
  }

  getFormControl(key) {
    return this.assetForm.controls[key]
  }

  //编辑去后台查询
  queryAssetInfo(): Observable<AssetContent> {
    return this.as.getAssetInfo(this._assetCode)
  }

  //新增手动初始化
  initAssetInfo(): AssetInfoModel {
    return {
      assetCode: '',
      name: '',
      owner: '',
      statusId: '',
      purchaseBatch: '',//批次
      inputTime: new Date(),
      scripTime: null,//报废时间
      outputTime: null,//出库时间
      remark: '', //备注
      projectName: '',//项目名称
      //isDelivery: '',//项目是否交付
      sourceTypeId: '',//来源类型
      warningTime: null,//到期提醒提前日:单位天
      usePeriod: null,//使用期限:单位月
      version:'',//版本号
      pattern:'',//采购型号
      configuration:'',//配置
      ownerDepartment:"",//部门
      cardNumber:''
    }
  }

  //查询资产状态
  statusList: Array<AssetStatusModel>;

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

  //资产来源
  assetSourceTypes: Array<AssetSourceTypeModel> = AssetSourceTypes;

  //项目是否交付
  /*projectDelivery: Array<{ code: number, label: string }> = [
    {
      code: 1,
      label: '已交付'
    },
    {
      code: 0,
      label: '未交付'
    }
  ];*/

  submitForm($event) {
    $event.preventDefault();
    for (const key in this.assetForm.controls) {
      this.assetForm.controls[key].markAsDirty();
    }

    if (!!this._assetCode) {
      this.formSubmit.emit(this.assetForm.value as AssetInfoModel);
    }
    else {
      const _value = Object.assign({}, this.assetForm.value);
      delete _value.inputTime;
      this.formSubmit.emit(_value as AssetInfoModel);
    }

  }

  //构建响应式表单
  createAssetForm(assetInfo: AssetInfoModel) {
    this.assetForm = this.fb.group({
      assetCode: [assetInfo.assetCode],
      name: [assetInfo.name, [Validators.required]],
      purchaseBatch: [assetInfo.purchaseBatch, [Validators.required]],
      owner: [assetInfo.owner, Validators.required],
      statusId: [assetInfo.statusId, [Validators.required]],
      sourceTypeId: [assetInfo.sourceTypeId, [Validators.required]],
      usePeriod: [assetInfo.usePeriod, [Validators.required]],
      inputTime: [assetInfo.inputTime],
      warningTime: [assetInfo.warningTime],
      outputTime: [assetInfo.outputTime],
      scripTime: [assetInfo.scripTime],
      projectName: [assetInfo.projectName],
      cardNumber: [assetInfo.cardNumber],
      version: [assetInfo.version],
      pattern: [assetInfo.pattern],
      configuration: [assetInfo.configuration],
      ownerDepartment: [assetInfo.ownerDepartment, [Validators.required]],
      //isDelivery: [assetInfo.isDelivery],
      remark: [assetInfo.remark, [Validators.maxLength(300)]]
    });

    this.queryStatusList();
  }

  projectNameSearchText: FormControl = new FormControl();
  projectNames: Array<ProjectInfo> = [];
  projectSearch(searchText: string) {
    this.projectNameSearchText.setValue(searchText);
  }

  formatterInt = value => value ? Math.abs(parseInt(value, 10)) : null;
  parserInt = value => Math.abs(parseInt(value, 10));

  initProjectNames(searchText: string) {
    this.as.projectSearch({projectName: searchText}).subscribe(
      (data) => {
        this.projectNames = data;
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  /**批次号模糊查询*/
  purchaseSearchText: FormControl = new FormControl();
  purchaseNames: Array<PurchaseInfo> = [];
  purchaseBatchSearch(searchText: string) {
    this.purchaseSearchText.setValue(searchText);
  }
  initPurchaseBatch(searchText: string) {
    this.as.purchaseBatchSearch({purchaseBatch: searchText}).subscribe(
        (data) => {
          this.purchaseNames = data;
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  constructor(private as: AssetService, private fb: FormBuilder, private nzMessage: NzMessageService,private ar:ActivatedRoute) {
  }

  _projectNameObserver: Subscription;//订阅者
  _purchaseNameObserver: Subscription;//订阅者
  /*系统管理员*/
  userType:string='';
  ngOnInit() {
    //目的：不要一边输入一遍去查，消耗性能
    this._projectNameObserver = this.projectNameSearchText.valueChanges.debounceTime(300).subscribe((text: string) => {
      this.initProjectNames(text);
    });

    if(this._assetCode) {
      this.initProjectNames('');
    }

    this._purchaseNameObserver = this.purchaseSearchText.valueChanges.debounceTime(300).subscribe((text: string) => {
      this.initPurchaseBatch(text);
    });

    this.ar.queryParams.subscribe(queryParams=>{
      this.userType=queryParams.userType;
    })

  }

  ngOnDestroy(): void {
    this._projectNameObserver.unsubscribe();
  }
}
