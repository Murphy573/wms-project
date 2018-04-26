/**
 * Created by xuming.jiang on 2018/2/27.
 */

import {AssetInfoModel, AssetQueryParamsModel, AssetSourceTypes, AssetStatusModel, AssetTypeModel, AssetSourceTypeModel , AssetBaseModel} from '../../asset-management/asset-models/asset-model';

export {AssetStatusModel as OfficeSupStatusModel,
    AssetTypeModel as OfficeSupTypeModel,
    AssetSourceTypeModel as OfficeSupSourceTypeModel,
    AssetSourceTypes as OfficeSupSourceTypes,
    AssetBaseModel as OfficeSupBaseModel}


/**
 * 办公列表返回VO
 */
export interface OfficeSupInfoModel extends AssetInfoModel{
    officeSupId ?: string;
    chargePerson?: string;
    warningNumber?: number;
}

export class OfficeSupQueryParamsModel extends AssetQueryParamsModel{
    officeSupId?: string;
}

/**
 * 领用对象
 */
export interface OfficeSupReceiveModel{
    officeSupId?:string; //领用办公用品ID
    user?:string;  //领用人
    number?:number; //领用数量
    receiveTime?:Date; //领用日期
    remark?:string; //备注
}

export interface PurchaseInfo{
    purchaseBatch? : string;
}


