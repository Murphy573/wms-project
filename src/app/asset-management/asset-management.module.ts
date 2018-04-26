import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetMgrComponent } from './asset-mgr/asset-mgr.component';
import { AssetManagementRouting } from './asset-management.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AssetListComponent } from './asset-list/asset-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AssetService} from './asset-services/asset.service';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';

@NgModule({
  imports: [
    AssetManagementRouting,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [AssetMgrComponent, AssetListComponent, AssetAddComponent, AssetInfoComponent, AssetEditComponent],
  providers: [AssetService]
})
export class AssetManagementModule { }
