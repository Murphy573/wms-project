/**
 * write by @pengfei.li
 */
import {Routes, RouterModule}         from '@angular/router';
import {NgModule}                     from '@angular/core';
import {ProjectMaterialMgrComponent}  from './project-material-mgr/project-material-mgr.component';
import {ProjectMaterialListComponent} from './project-material-list/project-material-list.component';
import {ProjectManagementComponent}   from './project-management/project-management.component';

const routing: Routes = [
  {
    path: '',
    component: ProjectMaterialMgrComponent,
    children: [
      {
        path: '',
        component: ProjectMaterialListComponent,
        data: {
          breadCrumbs: [{
            title: '项目物资管理',
          }],
          menuKeyword: 'project-material-management'
        }
      },
      {
        path: 'project-management',
        component: ProjectManagementComponent,
        data: {
          breadCrumbs: [
            {
              routerLink: '/main/project-material-management',
              title: '项目物资管理',
            },
            {
              title: '项目组管理'
            }
          ],
          menuKeyword: 'project-material-management'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routing)],
  exports: [RouterModule]
})
export class ProjectMaterialRouting {}
