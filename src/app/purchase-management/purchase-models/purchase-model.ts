/**
 * Created by xuming.jiang on 2018/3/5.
 */
import {
    AssetQueryParamsModel, AssetSourceTypes, AssetStatusModel, AssetSourceTypeModel,
    AssetBaseModel, PurchasingInfoModel, AssetTypeModel
} from '../../asset-management/asset-models/asset-model';

export {AssetStatusModel as PurchaseStatusModel,
    AssetSourceTypeModel as PurchaseSourceTypeModel,
    AssetTypeModel as PurchaseTypeModel,
    AssetSourceTypes as PurchaseSourceTypes,
    AssetBaseModel as PurchaseBaseModel,
    AssetQueryParamsModel as PurchaseQueryParamsModel
}

/**
 * 采购列表返回VO
 */

export interface PurchaseInfoModel extends PurchasingInfoModel{
    /*supplierInfoVO?: SupplierInfoModel;*/
    supplierName?: string;
    typeId?:string;
    typeName?:string;
    configuration?:string;
    usePeriod?: Date;
    //scripTime?:Date;
}
 export interface PaymentMethodVO{
     paymentMethodId?: string;
     paymentMethodName?: string;
 }

export interface PaymentPeriodVO{
    paymentPeriodId?: string;
    paymentPeriodName?: string;
}

export interface SupplierVO{
    supplierName?:string;
    supplierCode?:string;
}


/*
export class PurchaseQueryParamsModel extends AssetQueryParamsModel{
    id?: string;
}*/
