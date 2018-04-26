import {NgModule} from '@angular/core';
import {CommonModule}         from '@angular/common';
import {MainComponent}          from './main/main.component';
import {MainRouting}            from './main.routing';
import {UserBarComponent}       from './user-bar/user-bar.component';
import {NgZorroAntdModule}      from 'ng-zorro-antd';
import {MenuComponent}          from './menu/menu.component';
import {SubMenuComponent}       from './menu/sub-menu.component';
import {BreadcrumbComponent}    from './breadcrumb/breadcrumb.component';
import {TableCheckboxService}   from '../shared/common/table-checkbox.service';
import {MainService}            from './main.service';
import {CommonComponentsModule} from '../shared/components/common-components.module';

@NgModule({
  imports: [
    NgZorroAntdModule,
    MainRouting,
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [MainComponent, UserBarComponent, MenuComponent, SubMenuComponent, BreadcrumbComponent],
  providers: [TableCheckboxService, MainService]
})
export class MainModule {
}
