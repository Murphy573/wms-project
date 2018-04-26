import { Injectable } from '@angular/core';
import {LoginToken}   from '../../login/login.model';

@Injectable()
export class SessionService {

  constructor() { }

  public setLoginSession(session: LoginToken): void {
    window.sessionStorage.setItem('wsm_token', JSON.stringify(session));
  }

  public getLoginSession(): LoginToken {
    return JSON.parse(window.sessionStorage.getItem('wsm_token')) as LoginToken;
  }

  public removeLoginSession(): void {
    window.sessionStorage.removeItem('wsm_token');
  }
}
