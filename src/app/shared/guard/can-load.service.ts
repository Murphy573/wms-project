import { Injectable } from '@angular/core';
import {CanLoad, Route} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../common/session.service';


@Injectable()
export class CanLoadService implements CanLoad{
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return !!this.ss.getLoginSession();
  }

  constructor(private ss: SessionService) { }

}
