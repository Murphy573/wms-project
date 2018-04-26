/**
 * write by @pengfei.li
 */

export interface AssetStatusModel {
  statusId?: string;
  statusName?: string;

  [key: string]: any;
}

export interface AssetTypeModel {
  typeId?: string;
  typeName?: string;

  [key: string]: any;
}

export interface AssetSourceTypeModel {
  sourceTypeId?: string;
  sourceTypeName?: string;

  [key: string]: any;
}

export const AssetSourceTypes: Array<AssetSourceTypeModel> = [
  {
    sourceTypeId: '0',
    sourceTypeName: '公司'
  },
  {
    sourceTypeId: '1',
    sourceTypeName: '客户'
  }
];

/**
 * 资产基础数据模型
 */
export interface AssetBaseModel extends AssetStatusModel, AssetTypeModel, AssetSourceTypeModel {
  name?: string;
  pattern?: string;
  purchaseBatch?: string;

  [key: string]: any;
}

//供应商
export interface SupplierInfoModel {
  supplierCode?: string;	//供应商编号
  supplierName?: string	//供应商名称
  isXiAn?: number	//在西安是否有分支机构
  paymentMethodId?: string	//付款周期类型id
  paymentMethodName?: string	//付款周期类型
  paymentPeriodId?: string	//付款周期类型名称id
  paymentPeriodName?: string	//付款周期类型名称
  remark?: string	//备注
  phone?:string //电话
}

//采购
export interface PurchasingInfoModel {
  supplierInfoVO?: SupplierInfoModel;
  purchaseBatch?: string;//	采购批次
  purchaseName?: string;//	采购物名称
  purchaseTypeId?: string;//	采购物类型id
  purchaseTypeName?: string;//	采购物类型
  pattern?: string;// 	采购物型号
  taxPoint?: number;// 	税点
  purchasePrice?: number;// 	单价
  amount?: number;//	数量
  totalPrice?: number;// 	总价
  purchaser?: string;//	采购人
  purchaserTime?: Date;//	采购时间(手动录入)
  supplierCode?: string;//	供应商编号
  expireDate?: Date;//	到期/报废时间(手动录入)
  outputTime?: Date;//	出库时间(手动录入)
  inputTime?: Date;//	入库时间
  warrantyPeriod?: number;//	保修期
  version?: string;// 	软件版本
  remark?: string;//	备注
  isDelete?: number;//	是否删除,1-未删除,0-已删除
}

/**
 * 资产列表返回VO
 */
export interface AssetInfoModel extends AssetBaseModel {
  assetCode?: string;
  owner?: string;
  version?: string;
  price?: number;
  warningTime?: Date;
  scripTime: Date,//报废时间
  outputTime?: Date,//出库时间
  usePeriod?: Date,//使用期限： 单位月
  totalAmount?: number;
  totalPrice?: number;
  projectName?: string;
  pattern?: string;
  configuration?:string;
  cardNumber?:string;
  ownerDepartment?:string;
  [key: string]: any;
}

export class AssetQueryParamsModel {
  projectId?: string;
  assetCode?: string;
  purchaseBatch?: string;
  name?: string;
  typeId?: string;
  statusId?: string;
  sourceTypeId?: string;
  purchaser?: string;
  owner?: string;
  supplier?: string;
  startTime?: Date;
  endTime?: Date;
  currentPage?: number;
  pageSize?: number;
}

//借出对象
export interface AssetBorrowModel {
  id?: string;	//借还记录id
  assetCode?: string;//	资产编号
  assetStatusId?: string;	//资产状态id
  name?: string;	//借出人
  borrowTime?: Date;	//借出时间
  returnTime?: Date;	//归还时间
  ownerDepartment?:string;
}

export interface AssetExportParams{
  assetCodes?:Array<string>;
  condition:{
    name?: '',
    assetCode?: '',
    statusId?: '',
    typeId?:'',
    startTime?:Date,
    endTime?:Date,
    owner?:''
  };
}
  export interface AssetDetailParams{
    id?:string;
    assetName?:string;
    assetCode?:string;
    owner?:string;
    operationTypeName?:string;
    operator?:string;
    operationTime?:string;
}


