import {NgModule}                         from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {HomeMgrComponent}                 from './home-mgr/home-mgr.component';
import {HomeRouting}                      from './home.routing';
import {NgZorroAntdModule}                from 'ng-zorro-antd';
import {HomeChartComponent}               from './home-chart/home-chart.component';
import {HomeServiceService}               from './services/home-service.service';
import { HomeTableComponent }             from './home-table/home-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetService}                     from '../asset-management/asset-services/asset.service';
import { HomeNotifyComponent } from './home-notify/home-notify.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HomeServiceService, AssetService],
  declarations: [HomeMgrComponent, HomeChartComponent, HomeTableComponent, HomeNotifyComponent]
})
export class HomeModule {
}
