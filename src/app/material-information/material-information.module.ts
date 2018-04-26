import {NgModule} from "@angular/core";
import {MaterialMgrComponent} from "./material-mgr/material-mgr.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MaterialInformationRouting} from "./material-information.routing";
import {MaterialService} from "./material-services/material-service";
import {MaterialListComponent} from "./material-list/material-list.component";


@NgModule({
  imports: [
    MaterialInformationRouting,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [MaterialMgrComponent, MaterialListComponent],
  providers: [MaterialService]
})
export class MaterialInformationModule { }
