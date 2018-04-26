import { Injectable }                                                       from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable}                                                         from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {ResponseModel}                                                      from '../models/Response';
import {SessionService}                                                     from '../common/session.service';
import {Router}                                                             from '@angular/router';
import {NzMessageService}                                                   from 'ng-zorro-antd';

export const enum ResponseCode {
  SUCCESS = '000000',
  TIMEOUT = '000010'
}

@Injectable()
export class MyHttpInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _loginToken = this.ss.getLoginSession();
    let _token = req.params.append('token', _loginToken ? this.ss.getLoginSession().token : '');

    const _req = req.clone({params: _token});

    return next.handle(_req).map(event => {
      //拦截响应
      if (event instanceof HttpResponse) {
        const response: ResponseModel = event.body as ResponseModel;
        //成功
        if(response.code === ResponseCode.SUCCESS) {
          event = event.clone({body: response.content});
        }
        else if(response.code === ResponseCode.TIMEOUT) {
          this.router.navigate(['/login']);
          throw response;
        }
        //失败
        else {
          throw response;
        }
      }
      return event;
    });
  }

  constructor(private ss: SessionService, private router: Router, private nzMessage: NzMessageService) { }

}
