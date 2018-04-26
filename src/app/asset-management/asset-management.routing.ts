/**
 * write by @pengfei.li
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AssetMgrComponent} from './asset-mgr/asset-mgr.component';
import {AssetListComponent} from './asset-list/asset-list.component';
import {AssetAddComponent} from './asset-add/asset-add.component';
import {AssetEditComponent} from './asset-edit/asset-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AssetMgrComponent,
    children: [
      {
        path: '',
        component: AssetListComponent,
        data: {
          breadCrumbs: [
            {
              title: '资产管理',
              routerLink: '/main/asset-management'
            }
          ],
          menuKeyword: 'asset-management'
        }
      },
      {
        path: 'asset-add',
        component: AssetAddComponent,
        data: {
          breadCrumbs: [
            {
              title: '资产管理',
              routerLink: '/main/asset-management'
            },
            {
              title: '新增资产',
            },
          ],
          menuKeyword: 'asset-management'
        }
      },
      {
        path: 'asset-edit',
        component: AssetEditComponent,
        data: {
          breadCrumbs: [
            {
              title: '资产管理',
              routerLink: '/main/asset-management'
            },
            {
              title: '编辑资产',
            },
          ],
          menuKeyword: 'asset-management'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AssetManagementRouting {}
