import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PurchaseMgrComponent} from "./purchase-mgr/purchase-mgr.component";
import {PurchaseAddComponent} from "./purchase-add/purchase-add.component";
import {PurchaseEditComponent} from "./purchase-edit/purchase-edit.component";
import {PurchaseService} from "./purchase-services/purchase-service";
import {PurchaseListComponent} from "./purchase-list/purchase-list.component";
import {PurchaseInfoComponent} from "./purchase-info/purchase-info.component";
import {PurchaseManagementRouting} from "./purchase-management.routing";
/**
 * Created by xuming.jiang on 2018/3/5.
 */
@NgModule({
    imports: [
        PurchaseManagementRouting,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule
    ],
    declarations: [PurchaseMgrComponent, PurchaseListComponent, PurchaseAddComponent, PurchaseInfoComponent, PurchaseEditComponent],
    providers: [PurchaseService]
})
export class PurchaseManagementModule { }