import {Injectable}            from '@angular/core';
import {Observable}            from 'rxjs/Observable';
import {HttpClient}            from '@angular/common/http';
import {UtilService}           from '../shared/common/util.service';
import {LoginInfo, LoginToken} from './login.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private util: UtilService) {
  }

  login(user: LoginInfo): Observable<LoginToken> {
    return this.http.post<LoginToken>('usmart/account/login', user);
  }
}
