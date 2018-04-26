import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OfficeSupService} from "../OfficeSup-services/OfficeSup.service";
import {NzMessageService} from "ng-zorro-antd";
import {OfficeSupInfoModel} from "../OfficeSup-models/OfficeSup-model";

@Component({
  selector: 'wms-office-sup-edit',
  template: '<wms-OfficeSup-info [officeSupId]="officeSupId"  (formSubmit)="editOfficeSup($event)"></wms-OfficeSup-info>',
  styles: ['']
})
export class OfficeSupEditComponent implements OnInit {

  officeSupId: string = '';
    userType: string;

  editOfficeSup(OfficeSupInfo: OfficeSupInfoModel) {
    this.os.editOfficeSupInfo(OfficeSupInfo).subscribe(
        (data: boolean) => {
          if(data) {
            this.nzMessage.success('办公用品编辑成功!');
            this.router.navigate(['/main/OfficeSup-management'],{
                queryParams:{
                    userType:this.userType
                }
            });
            return;
          }
        },
        (error) => {
          this.nzMessage.error(error.message);
        }
    );
  }

  constructor(private activeRoute: ActivatedRoute,
              private os: OfficeSupService,
              private nzMessage: NzMessageService,
              private router: Router)
  { }

  ngOnInit() {
      this.officeSupId = this.activeRoute.snapshot.queryParams['officeSupId'];
      this.userType = this.activeRoute.snapshot.queryParams['userType'];
  }

}
