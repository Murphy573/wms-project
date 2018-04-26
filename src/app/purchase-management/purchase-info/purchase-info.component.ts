import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { PurchaseService} from "../purchase-services/purchase-service";
import {Observable} from "rxjs";
import {
  PurchaseInfoModel, PaymentMethodVO, PaymentPeriodVO, PurchaseTypeModel, SupplierVO
} from "../purchase-models/purchase-model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.scss']
})
export class PurchaseInfoComponent implements OnInit {

  _purchaseBatch: string;

  PurchasingInfoVO: FormGroup;

  purchaseTypeList: Array<PurchaseTypeModel> = [];

  paymentMethodList:Array<PaymentMethodVO>=[];

  paymentPeriodList:Array<PaymentPeriodVO>=[];

  //searchOptions:Array<SupplierVO>=[];

  @Output() formSubmit: EventEmitter<PurchaseInfoModel> = new EventEmitter<PurchaseInfoModel>();

  @Input()
  set purchaseBatchParam(purchaseCode: string) {
    this._purchaseBatch = purchaseCode;

    if (purchaseCode !== '') {
      this.queryPurchaseInfo().subscribe(
          (data) => {
            this.createPurchaseForm(data);
          },
          (error) => {
            this.nzMessage.error(error.message);
          }
      );
    }
    else {
      this.createPurchaseForm(this.initPurchaseInfo());
    }
  }

  getFormControl(key) {
    return this.PurchasingInfoVO.get(key)
  }


  //类别
  queryTypeList() {
    this.ps.getPurchaseTypeList().subscribe(
        (data) => {
          this.purchaseTypeList = data as Array<PurchaseTypeModel>;

        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  //付款方式
  queryPaymentMethodList() {
    this.ps.queryPaymentMethod().subscribe(
        (data) => {
          this.paymentMethodList = data as Array<PaymentMethodVO>;

        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  //付款周期
  queryPaymentPeriodList() {
    this.ps.queryPaymentPeriod().subscribe(
        (data) => {
          this.paymentPeriodList = data as Array<PaymentPeriodVO>;

        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  //供应商
/*
  searchChange(){
    this.ps.querySearchChange(this.PurchasingInfoVO.value.supplierInfoVO.supplierName).subscribe(
          (data)=>{
            this.searchOptions = data as Array<SupplierVO>;
          },
          (error) =>{
            this.nzMessage.error(error.message);
          }
      )


  }*/



  //编辑去后台查询
  queryPurchaseInfo(): Observable<PurchaseInfoModel> {
    return this.ps.getPurchaseInfo(this._purchaseBatch)
  }

  //新增手动初始化
  initPurchaseInfo(): PurchaseInfoModel {
    return {
      supplierInfoVO:{
        supplierCode: '',
        supplierName: '',
        isXiAn:2,
        paymentMethodId: '',
        paymentMethodName: '',
        paymentPeriodId: '',
        paymentPeriodName: '',
        remark: '',
        phone:''
      },
      purchaseName: '',
      pattern:'',
      typeName: '',
      typeId: '',
      purchaseBatch: '',//批次
      inputTime: new Date(),
      //scripTime: new Date(),//报废时间
      outputTime: new Date(),//出库时间
      remark: '', //备注
      //projectCode: '',//项目编号
      //isDelivery: '',//项目是否交付
      //sourceTypeId: '',//来源类型
      warrantyPeriod: 1,//到期提醒提前日:单位天
      usePeriod: new Date(),//使用期限:单位月
     /* paymentMethodId:'',
      paymentMethodName:'',
      paymentPeriodId:'',
      paymentPeriodName:'',*/
      taxPoint:0,//税率
      purchasePrice:1,//单价
      amount:1,//数量
      totalPrice:1,//总计
      purchaser:'',//采购人
      purchaserTime:new Date(),//采购时间
     /* supplierName:'',//供应商
      supplierCode:'',//供应商编号*/
      /*phone:'',//供应商电话
      isXiAn:null,//是否在西安*/
      expireDate:new Date(),//到期/报废时间
      configuration:'',
      version:''

    }
  }

  submitForm($event) {
    $event.preventDefault();
    for (const key in this.PurchasingInfoVO.controls) {
      this.PurchasingInfoVO.controls[key].markAsDirty();
    }
   /* let _formData = new FormData();
    this.fileList.forEach(file =>  _formData.append(file.name, file));*/


    if (!!this._purchaseBatch) {
      // this.purchaseForm.value.reportFile = _formData;
      //delete this.purchaseForm.value.reportFile;

      this.PurchasingInfoVO.value.totalPrice=this.CalculateTotalPrice();
      this.formSubmit.emit(this.PurchasingInfoVO.value as PurchaseInfoModel);

    }
    else {
      let _value = Object.assign({}, this.PurchasingInfoVO.value);
      delete _value.inputTime;
      _value.totalPrice=this.CalculateTotalPrice();


      this.formSubmit.emit(_value as PurchaseInfoModel);

    }


  }


  //构建响应式表单
  createPurchaseForm(purchaseInfo: PurchaseInfoModel) {
    /*this.purchaseForm = this.fb.group({*/
      this.PurchasingInfoVO= this.fb.group({
        supplierInfoVO:this.fb.group({
          phone: [purchaseInfo.supplierInfoVO.phone],
          isXiAn: [purchaseInfo.supplierInfoVO.isXiAn],
          paymentMethodId: [purchaseInfo.supplierInfoVO.paymentMethodId,[Validators.required]],
          paymentMethodName: [purchaseInfo.supplierInfoVO.paymentMethodName],
          paymentPeriodId:[purchaseInfo.supplierInfoVO.paymentPeriodId,[Validators.required]],
          paymentPeriodName:[purchaseInfo.supplierInfoVO.paymentPeriodName],
          supplierName: [purchaseInfo.supplierInfoVO.supplierName,[Validators.required]],
          supplierCode: [purchaseInfo.supplierInfoVO.supplierCode]
        }),
        purchaseName:[purchaseInfo.purchaseName,[Validators.required]],
        pattern:[purchaseInfo.pattern],
        purchaseBatch: [purchaseInfo.purchaseBatch,[Validators.required]],
        typeId: [purchaseInfo.typeId,[Validators.required]],
        typeName: [purchaseInfo.typeName],
        usePeriod: [purchaseInfo.usePeriod],
        amount: [purchaseInfo.amount,[Validators.required]],
        purchasePrice: [purchaseInfo.purchasePrice,[Validators.required]],
        totalPrice: [purchaseInfo.totalPrice],
        //scripTime: [purchaseInfo.scripTime],
        inputTime: [purchaseInfo.inputTime],
        outputTime: [purchaseInfo.outputTime],
        purchaser: [purchaseInfo.purchaser,[Validators.required]],
        purchaserTime: [purchaseInfo.purchaserTime],
        expireDate: [purchaseInfo.expireDate],
        taxPoint: [purchaseInfo.taxPoint],
        warrantyPeriod: [purchaseInfo.warrantyPeriod],
        remark: [purchaseInfo.remark, [Validators.maxLength(300)]],
        configuration:[purchaseInfo.configuration],
        version:[purchaseInfo.version]
      });
      /*reportFile:{}*/
    /*})*/
    this.queryTypeList();
    this.queryPaymentMethodList();
    this.queryPaymentPeriodList();
  }

  formatterInt = value => value ? Math.abs(parseInt(value, 10)) : null;
  parserInt = value => Math.abs(parseInt(value, 10));

  constructor(private ps: PurchaseService, private fb: FormBuilder, private nzMessage: NzMessageService,private ar:ActivatedRoute) {
  }

  //计算总价
  CalculateTotalPrice(){
    let _totalPrice;
      _totalPrice=this.PurchasingInfoVO.value.amount*(this.PurchasingInfoVO.value.purchasePrice+(this.PurchasingInfoVO.value.taxPoint/100));
      //_totalPrice=_totalPrice.toFixed(2);
      return _totalPrice;
  }


  //图片上传
  /*fileList: UploadFile[] = [];
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }*/
  userType:string;
  ngOnInit() {
    this.ar.queryParams.subscribe(queryParams=>{
      this.userType=queryParams.userType;
    })
  }

}
