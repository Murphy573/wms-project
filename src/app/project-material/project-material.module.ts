import {NgModule}                       from '@angular/core';
import {CommonModule}                   from '@angular/common';
import {ProjectMaterialRouting}         from './project-material.routing';
import {ProjectMaterialMgrComponent}      from './project-material-mgr/project-material-mgr.component';
import {NgZorroAntdModule}                from 'ng-zorro-antd';
import { ProjectMaterialListComponent }   from './project-material-list/project-material-list.component';
import {CommonComponentsModule}           from '../shared/components/common-components.module';
import { TableComponent }                 from './project-material-list/table/table.component';
import { SearchComponent }                from './project-material-list/search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetService}                     from '../asset-management/asset-services/asset.service';
import {ProjectMaterialService}           from './services/project-material.service';
import { ProjectManagementComponent }     from './project-management/project-management.component';
import { ProjectListComponent }           from './project-management/project-list/project-list.component';

@NgModule({
  imports: [
    ProjectMaterialRouting,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    CommonComponentsModule
  ],
  providers: [AssetService, ProjectMaterialService],
  declarations: [ProjectMaterialMgrComponent, ProjectMaterialListComponent, TableComponent, SearchComponent, ProjectManagementComponent, ProjectListComponent]
})
export class ProjectMaterialModule {
}
