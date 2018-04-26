/**
 * write by @pengfei.li
 */
import {Routes, RouterModule} from '@angular/router';
import {NgModule}             from '@angular/core';
import {HomeMgrComponent}     from './home-mgr/home-mgr.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMgrComponent,
    data: {
      breadCrumbs: [
        {
          title: '资产首页'
        }
      ],
      menuKeyword: 'home'
    }
  }
];

@NgModule(
  {
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  }
)
export class HomeRouting {}
