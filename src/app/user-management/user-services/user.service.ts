/**
 * write by @pengfei.li
 */
import {Injectable} from '@angular/core';
import {UserDepartmentModel, UserInfoModel, UserQueryParamsModel} from '../user-models/user-model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Pagination} from '../../shared/models/Pagination';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUserList(param: UserQueryParamsModel): Observable<Pagination<UserInfoModel>> {
    return this.http.post<Pagination<UserInfoModel>>('usmart/user/userList', param);
  }

  deleteUsers(param: string[]): Observable<boolean> {
    return this.http.post<boolean>('usmart/user/delete', param);
  }

  getDepartments(): Observable<Array<UserDepartmentModel>> {
    return this.http.post<Array<UserDepartmentModel>>('usmart/user/findDepartments', null);
  }

  addUser(param: UserInfoModel): Observable<boolean> {
    return this.http.post<boolean>('usmart/user/add', param);
  }

  editUser(param: UserInfoModel): Observable<boolean> {
    return this.http.post<boolean>('usmart/user/update', param);
  }

  getUser(param: string): Observable<UserInfoModel> {
    return this.http.post<UserInfoModel>('usmart/user/findUserById', {userId: param});
  }

  updateUserPassword(userId: string, password: string): Observable<boolean> {
    return this.http.post<boolean>('usmart/user/updatePassword', {userId: userId, password: password});
  }
}
