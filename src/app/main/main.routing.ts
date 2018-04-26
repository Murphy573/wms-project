/**
 * write by @pengfei.li
 */
/**
 * write by @pengfei.li
 */
import {RouterModule, Routes} from '@angular/router';
import {MainComponent}        from './main/main.component';
import {NgModule}             from '@angular/core';
import {HomeModule}           from '../home/home.module';


const main: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: 'app/home/home.module#HomeModule',
      },
      {
        path: 'asset-management',
        loadChildren: 'app/asset-management/asset-management.module#AssetManagementModule',
      },
      {
        path: 'user-management',
        loadChildren: 'app/user-management/user-management.module#UserManagementModule'
      },
      {
        path: 'purchase-management',
        loadChildren: 'app/purchase-management/purchase-management.module#PurchaseManagementModule'
      },
      {
        path: 'OfficeSup-management',
        loadChildren: 'app/OfficeSup-management/OfficeSup-management.module#OfficeSupManagementModule'
      },
      {
        path: 'project-material-management',
        loadChildren: 'app/project-material/project-material.module#ProjectMaterialModule'
      },
      {
        path:'material-information',
        loadChildren: 'app/material-information/material-information.module#MaterialInformationModule'
      }
    ]
  }
];

@NgModule(
  {
    imports: [RouterModule.forChild(main)],
    exports: [RouterModule]
  }
)
export class MainRouting {}
