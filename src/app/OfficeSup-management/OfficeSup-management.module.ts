import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OfficeSupMgrComponent} from "./OfficeSup-mgr/OfficeSup-mgr.component";
import {OfficeSupManagementRouting} from "./OfficeSup-management.routing";
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {OfficeSupService} from './OfficeSup-services/OfficeSup.service';
import {OfficeSupListComponent} from "./OfficeSup-list/OfficeSup-list.component";
import {OfficeSupEditComponent} from "./OfficeSup-edit/OfficeSup-edit.component";
import { OfficeSupInfoComponent } from './OfficeSup-info/OfficeSup-info.component';
import { OfficeSupAddComponent } from './Office-sup-add/Office-sup-add.component';

@NgModule({
  imports: [
    OfficeSupManagementRouting,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [OfficeSupMgrComponent, OfficeSupListComponent, OfficeSupEditComponent, OfficeSupInfoComponent, OfficeSupAddComponent],
  providers: [OfficeSupService]
})
export class OfficeSupManagementModule { }
