import { Injectable }                           from '@angular/core';
import {HttpClient}                             from '@angular/common/http';
import {Observable}                             from 'rxjs/Observable';
import {AssetRatio, BorrowModel, Notifications} from '../models/home-model';
import {AssetQueryParamsModel}                  from '../../asset-management/asset-models/asset-model';

@Injectable()
export class HomeServiceService {

  constructor(private http: HttpClient) { }

  getAssetRatio(): Observable<AssetRatio> {
    return this.http.post<AssetRatio>('usmart/home/showStatusRatio', null);
  }

  getNotifications(): Observable<Array<Notifications>> {
    return this.http.post<Array<Notifications>>('usmart/home/warning', null);
  }

  getBorrowRecord(param: AssetQueryParamsModel): Observable<Array<BorrowModel>> {
    return this.http.post<Array<BorrowModel>>('usmart/home/return', param);
  }
  judgeLogin():Observable<boolean>{
    return this.http.post<boolean>('usmart/user/judgeLogin',null);
  }
}
