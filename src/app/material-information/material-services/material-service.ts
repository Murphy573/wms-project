/**
 * Created by xuming.jiang on 2018/3/12.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Pagination} from '../../shared/models/Pagination';
import {MaterialQueryParamsModel, MaterialInfoModel} from "../material-models/material-model";

@Injectable()
export class MaterialService {
    constructor(private http: HttpClient) {
    }
    public getMaterialList(params: MaterialQueryParamsModel): Observable<Pagination<MaterialInfoModel>> {
        return this.http.post<Pagination<MaterialInfoModel>>('usmart/materialInfoMgr/findMaterialInfoList', params);
    }
}