import {BrowserModule}                        from '@angular/platform-browser';
import {NgModule}                             from '@angular/core';
import {NgZorroAntdModule, NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';

import {AppComponent}                        from './app.component';
import {AppRoutingModule}                    from './app-routing.module';
import {CanLoadService}                      from './shared/guard/can-load.service';
import {UtilService}                         from './shared/common/util.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SessionService}                      from './shared/common/session.service';
import {BrowserAnimationsModule}             from '@angular/platform-browser/animations';
import {CommunicationService}                from './shared/communication/communication.service';
import {MyHttpInterceptorService}            from './shared/interceptor/my-http-interceptor.service';
import {INIT_PAGE_PARAMS}                    from './shared/models/page-params-init';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgZorroAntdModule.forRoot({extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont'})
  ],
  providers: [
    CanLoadService,
    UtilService,
    SessionService,
    {
      provide: 'PAGE_PARAM_INIT',
      useValue: INIT_PAGE_PARAMS
    },
    CommunicationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptorService,
      multi: true
    },
    {
      provide: NZ_MESSAGE_CONFIG,
      useValue: {
        nzDuration: 5000,//持续时间
        nzMaxStack: 7,//最大显示个数
        nzPauseOnHover: true,
        nzAnimate: true
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
