import {Component, OnInit, Output, Input,EventEmitter} from '@angular/core';
import {OfficeSupService, OfficeSupContent} from '../OfficeSup-services/OfficeSup.service';
import {Observable} from 'rxjs/Observable';
import {
  OfficeSupInfoModel, OfficeSupSourceTypeModel, OfficeSupSourceTypes, OfficeSupStatusModel,
  PurchaseInfo
} from '../OfficeSup-models/OfficeSup-model';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ProjectInfo} from "../../project-material/project-material-models";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-OfficeSup-info',
  templateUrl: './OfficeSup-info.component.html',
  styleUrls: ['./OfficeSup-info.component.scss']
})
export class OfficeSupInfoComponent implements OnInit {
  //_assetCode: string;

  _officeSupId:string;

  OfficeSupForm: FormGroup;

  @Output() formSubmit: EventEmitter<OfficeSupInfoModel> = new EventEmitter<OfficeSupInfoModel>();

  @Input()
  set officeSupId (officeSup: string) {
    this._officeSupId = officeSup;

    if(officeSup !== '') {
      this.queryOfficeSupInfo().subscribe(
          (data) => {
            this.createOfficeSupForm(data.officeSupInfoVO);
          },
          (error) => {
            this.nzMessage.error(error.message);
          }
      );
    }
    else {
      this.createOfficeSupForm(this.initOfficeSupInfo());
    }
  }

  getFormControl(key) {
    return this.OfficeSupForm.controls[key]
  }


  //编辑去后台查询
  queryOfficeSupInfo (): Observable<OfficeSupContent> {
    return this.as.getOfficeSupInfo(this._officeSupId)
  }

  //新增手动初始化
  initOfficeSupInfo(): OfficeSupInfoModel {
    return {
      officeSupId: '',
      chargePerson: '',
      statusId: '',
      purchaseBatch: '',//批次
      inputTime: new Date(),
      scripTime: null,//报废时间
      remark: '', //备注
      projectName: '',//项目名称
      warningNumber: null,//库存提醒
      //isDelivery: '',//项目是否交付
      sourceTypeId: '',//来源类型
      //usePeriod: 1//使用期限:单位月
    }
  }

  //查询资产状态
  statusList: Array<OfficeSupStatusModel>;
  queryStatusList() {
    this.as.getOfficeSupStatus().subscribe(
        (data) => {
          this.statusList = data as Array<OfficeSupStatusModel>;
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  //资产来源
  assetSourceTypes: Array<OfficeSupSourceTypeModel> = OfficeSupSourceTypes;

  //项目是否交付
  /*projectDelivery: Array<{code: number, label: string}> = [
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
    for (const key in this.OfficeSupForm.controls) {
      this.OfficeSupForm.controls[key].markAsDirty();
    }

    if(!!this._officeSupId) {
      this.formSubmit.emit(this.OfficeSupForm.value as OfficeSupInfoModel);
    }
    else {
      const _value = Object.assign({}, this.OfficeSupForm.value);
      delete _value.inputTime;
      this.formSubmit.emit(_value as OfficeSupInfoModel);
    }

  }

  //构建响应式表单
  createOfficeSupForm(OfficeSupInfo: OfficeSupInfoModel) {
    this.OfficeSupForm = this.fb.group({
      officeSupId: [OfficeSupInfo.officeSupId],
      purchaseBatch: [OfficeSupInfo.purchaseBatch, [Validators.required]],
      chargePerson: [OfficeSupInfo.chargePerson, [Validators.required]],
      statusId: [OfficeSupInfo.statusId, [Validators.required]],
      sourceTypeId: [OfficeSupInfo.sourceTypeId,[Validators.required]],
      //usePeriod: [OfficeSupInfo.usePeriod],
      inputTime: [OfficeSupInfo.inputTime],
      scripTime: [OfficeSupInfo.scripTime],
      projectName: [OfficeSupInfo.projectName],
      warningNumber: [OfficeSupInfo.warningNumber],
      //isDelivery: [OfficeSupInfo.isDelivery],
      remark: [OfficeSupInfo.remark, [Validators.maxLength(300)]]
    });

    this.queryStatusList();
  }

  projectNameOfficeSearchText: FormControl = new FormControl();
  projectNames: Array<ProjectInfo> = [];
  officeSupProjectSearch(searchText: string) {
    this.projectNameOfficeSearchText.setValue(searchText);
  }
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


  purchaseOfficeSearchText: FormControl = new FormControl();
  purchaseNames: Array<PurchaseInfo> = [];
  officeSupPurchaseBatchSearch(searchText: string) {
  this.purchaseOfficeSearchText.setValue(searchText);
}
  initPurchaseNames(searchText: string) {
    this.as.purchaseBatchSearch({purchaseBatch: searchText}).subscribe(
        (data) => {
          this.purchaseNames = data;
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }


  formatterInt = value => value ? Math.abs(parseInt(value, 10)) : null;
  parserInt = value => Math.abs(parseInt(value, 10));



  userType:string;
  /*formatterInt = value =>  value ? Math.abs(parseInt(value , 10)) : null;
  parserInt = value => Math.abs(parseInt(value, 10));*/

  constructor(private as: OfficeSupService, private fb: FormBuilder, private nzMessage: NzMessageService, private ar:ActivatedRoute) { }

  _projectNameOfficeObserver: Subscription;//订阅者
  _purchaseNameOfficeObserver: Subscription;//订阅者
  ngOnInit() {
    this._purchaseNameOfficeObserver = this.purchaseOfficeSearchText.valueChanges.debounceTime(300).subscribe((text: string) => {
      this.initPurchaseNames(text);
    });

    this._projectNameOfficeObserver = this.projectNameOfficeSearchText.valueChanges.debounceTime(300).subscribe((text: string) => {
      this.initProjectNames(text);
    });
    if(this._officeSupId) {
      this.initProjectNames('');
    }

    this.ar.queryParams.subscribe(queryParams=>{
      this.userType = queryParams.userType;
    })




  }

}
