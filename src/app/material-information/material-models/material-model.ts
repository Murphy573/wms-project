/**
 * Created by xuming.jiang on 2018/3/12.
 */
export interface MaterialQueryParamsModel {
    materialName? : string;
    supplierName? : string;
    currentPage?: number;
    pageSize?: number;
}

export interface PriceListInfo{

}

export interface MaterialInfoModel{
    materialName? : string;
    materialTypeName? : string;
    purchaseBatch? : string;
    purchaserTime? : Date;
    supplierName? : string;
    Phone? : string;
    paymentMethodName? : string;
    paymentPeriodName? : string;
    priceList? : PriceListInfo;
}

export interface xAxisObj{
    data? : Array<string>;
}

export interface LineOptions{
    xAxis?: Array<Date>;
    title? : string;
    series?: Array<number>;
}




