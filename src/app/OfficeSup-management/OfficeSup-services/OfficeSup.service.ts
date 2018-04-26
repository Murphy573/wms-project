/**
 * Created by xuming.jiang on 2018/2/28.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Pagination} from '../../shared/models/Pagination';
import {
    OfficeSupInfoModel, OfficeSupQueryParamsModel, OfficeSupStatusModel, OfficeSupTypeModel,
    OfficeSupReceiveModel, OfficeSupBaseModel, PurchaseInfo
} from '../OfficeSup-models/OfficeSup-model';
import {ProjectInfo} from "../../project-material/project-material-models";


export type OfficeSupContent = {officeSupInfoVO: OfficeSupInfoModel};
@Injectable()
export class OfficeSupService {
    constructor(private http: HttpClient) {}

    public getOfficeSupList(params: OfficeSupQueryParamsModel): Observable<Pagination<OfficeSupInfoModel>> {
        return this.http.post<Pagination<OfficeSupInfoModel>>('usmart/officeSupMgr/findOfficeSupLists', params);
    }

    public getOfficeSupTypeList(): Observable<OfficeSupTypeModel> {
        return this.http.post<OfficeSupTypeModel>('usmart/materialInfoMgr/findAllType', null);
    }

    public getOfficeSupStatus(): Observable<OfficeSupStatusModel> {
        return this.http.post<OfficeSupStatusModel>('usmart/assetMgr/findAllStatus', null);
    }

    public deleteOfficeSup(officeSupId: Array<string>): Promise<boolean> {
        return this.http.post<boolean>('usmart/officeSupMgr/deleteOfficeSup', officeSupId).toPromise<boolean>();
    }

    public addOfficeSup(OfficeSupInfo: OfficeSupInfoModel): Observable<boolean> {
        return this.http.post<boolean>('usmart/officeSupMgr/addOfficeSup', OfficeSupInfo);
    }

    public getOfficeSupInfo(officeSupId: string): Observable<OfficeSupContent> {
        return this.http.post<OfficeSupContent>('usmart/officeSupMgr/findOfficeSupInfo', {officeSupId: officeSupId})
    }

    public editOfficeSupInfo(OfficeSupInfo: OfficeSupInfoModel): Observable<boolean> {
        return this.http.post<boolean>('usmart/officeSupMgr/updateOfficeSup', OfficeSupInfo);
    }

    public borrowAndReturnAsset(receiveVO: OfficeSupReceiveModel): Observable<boolean> {
        return this.http.post<boolean>('usmart/officeSupMgr/receiveOfficeSup', receiveVO);
    }

    public projectSearch(param: ProjectInfo): Observable<Array<ProjectInfo>> {
        return this.http.post<Array<ProjectInfo>>('usmart/projectMgr/findProjectNames', param);
    }

    public purchaseBatchSearch(purchaseBatchParam:PurchaseInfo): Observable<Array<PurchaseInfo>> {
        return this.http.post<Array<PurchaseInfo>>('usmart/purchasingMgr/findPurchaseBatch', purchaseBatchParam);
    }

    public OfficeSupDetail(OfficeParam:OfficeSupReceiveModel):Observable<Array<OfficeSupReceiveModel>>{
        return this.http.post<Array<OfficeSupReceiveModel>>('usmart/officeSupMgr/findReceiveOfficeSup',OfficeParam)
    }
}













