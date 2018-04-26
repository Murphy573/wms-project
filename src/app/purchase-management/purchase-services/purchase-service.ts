/**
 * Created by xuming.jiang on 2018/3/5.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Pagination} from '../../shared/models/Pagination';
import {
    PurchaseInfoModel, PurchaseQueryParamsModel, PurchaseStatusModel, PurchaseTypeModel, PaymentMethodVO,
    PaymentPeriodVO, SupplierVO
}                   from '../purchase-models/purchase-model';
//import {SupplierInfoModel} from "../../asset-management/asset-models/asset-model";
//import {PurchasingInfoModel} from "../../asset-management/asset-models/asset-model";

//export type PurchaseContent = { purchaseInfoVO: PurchaseInfoModel};

@Injectable()
export class PurchaseService {
    constructor(private http: HttpClient) {
    }

    public getPurchaseList(params: PurchaseQueryParamsModel): Observable<Pagination<PurchaseInfoModel>> {
        return this.http.post<Pagination<PurchaseInfoModel>>('usmart/purchasingMgr/findPurchasingList', params);
    }

    //主类别
    public getPurchaseTypeList(): Observable<PurchaseTypeModel> {
        return this.http.post<PurchaseTypeModel>('usmart/materialInfoMgr/findAllType', null);
    }

    //次类别
    public getPurchaseStatus(): Observable<PurchaseStatusModel> {
        return this.http.post<PurchaseStatusModel>('usmart/assetMgr/findAllStatus', null);
    }

    public deletePurchase(purchaseBatch: Array<string>): Promise<boolean> {
        return this.http.post<boolean>('usmart/purchasingMgr/deletePurchasingInfo', purchaseBatch).toPromise<boolean>();
    }

    public addPurchase(purchaseInfo: PurchaseInfoModel): Observable<boolean> {
        return this.http.post<boolean>('usmart/purchasingMgr/addPurchasingInfo', purchaseInfo);
    }

    public getPurchaseInfo(purchaseBatch: string): Observable<PurchaseInfoModel> {
        return this.http.post<PurchaseInfoModel>('usmart/purchasingMgr/findPurchasingInfo', {purchaseBatch: purchaseBatch})
    }

    public editPurchaseInfo(purchaseInfo: PurchaseInfoModel): Observable<boolean> {
        return this.http.post<boolean>('usmart/purchasingMgr/updatePurchasingInfo', purchaseInfo);
    }

    //结算方式
   public queryPaymentMethod():Observable<PaymentMethodVO>{
        return this.http.post<PaymentMethodVO>("usmart/purchasingMgr/findPaymentMethod",null);
   }

    //付款周期
    public queryPaymentPeriod():Observable<PaymentPeriodVO>{
        return this.http.post<PaymentPeriodVO>("usmart/purchasingMgr/findPaymentPeriod",null);
    }

    //供应商模糊搜索
   /* public querySearchChange(supplierName:string):Observable<SupplierVO>{
        return this.http.post<boolean>("usmart/purchasingMgr/findSupplierNames",{supplierName:supplierName});
    }*/

}