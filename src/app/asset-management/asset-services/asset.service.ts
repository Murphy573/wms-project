/**
 * write by @pengfei.li
 */
import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {Observable}  from 'rxjs/Observable';
import {Pagination}  from '../../shared/models/Pagination';
import {
  AssetBorrowModel, AssetInfoModel, AssetQueryParamsModel, AssetStatusModel, AssetTypeModel,
  PurchasingInfoModel, AssetExportParams, AssetDetailParams
}                    from '../asset-models/asset-model';
import {ProjectInfo} from '../../project-material/project-material-models';
import {PurchaseInfo} from "../../OfficeSup-management/OfficeSup-models/OfficeSup-model";

export type AssetContent = { assetInfoVO: AssetInfoModel, purchasingInfoVO: PurchasingInfoModel };

@Injectable()
export class AssetService {
  constructor(private http: HttpClient) {
  }

  public getAssetList(params: AssetQueryParamsModel): Observable<Pagination<AssetInfoModel>> {
    return this.http.post<Pagination<AssetInfoModel>>('usmart/assetMgr/findAssetLists', params);
  }

  public getAssetTypeList(): Observable<Array<AssetTypeModel>> {
    return this.http.post<Array<AssetTypeModel>>('usmart/materialInfoMgr/findAllType', null);
  }

  public getAssetStatus(): Observable<Array<AssetStatusModel>> {
    return this.http.post<Array<AssetStatusModel>>('usmart/assetMgr/findAllStatus', null);
  }

  public deleteAssets(assetCodes: Array<string>): Promise<boolean> {
    return this.http.post<boolean>('usmart/assetMgr/deleteAsset', assetCodes).toPromise<boolean>();
  }

  public addAsset(assetInfo: AssetInfoModel): Observable<boolean> {
    return this.http.post<boolean>('usmart/assetMgr/addAsset', assetInfo);
  }

  public getAssetInfo(assetCode: string): Observable<AssetContent> {
    return this.http.post<AssetContent>('usmart/assetMgr/findAssetInfo', {assetCode: assetCode})
  }

  public editAssetInfo(assetInfo: AssetInfoModel): Observable<boolean> {
    return this.http.post<boolean>('usmart/assetMgr/updateAsset', assetInfo);
  }

  public borrowAndReturnAsset(borrowVO: AssetBorrowModel): Observable<boolean> {
    return this.http.post<boolean>('usmart/assetMgr/borrowAsset', borrowVO);
  }

  public projectSearch(param: ProjectInfo): Observable<Array<ProjectInfo>> {
    return this.http.post<Array<ProjectInfo>>('usmart/projectMgr/findProjectNames', param);
  }

  public purchaseBatchSearch(purchaseBatchParam:PurchaseInfo): Observable<Array<PurchaseInfo>> {
    return this.http.post<Array<PurchaseInfo>>('usmart/purchasingMgr/findPurchaseBatch', purchaseBatchParam);
  }

  public assetExport(assetParam:AssetExportParams):Observable<ArrayBuffer>{
    return this.http.post('usmart/assetMgr/assetListsExport',assetParam,{responseType:'arraybuffer'});
  }

  public assetImport(importParam){
    return this.http.post('usmart/assetMgr/assetListsImport',importParam);
  }

  public assetDetail(assetDetailParam:AssetDetailParams):Observable<AssetDetailParams>{
    return this.http.post('usmart/assetMgr/findAssetDetails',assetDetailParam)
  }

}
