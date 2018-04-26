import { Component, OnInit } from '@angular/core';
import {OfficeSupInfoModel} from '../OfficeSup-models/OfficeSup-model';
import {OfficeSupService} from '../OfficeSup-services/OfficeSup.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'wms-office-sup-add',
  template: '<wms-OfficeSup-info [officeSupId]="officeSupId"  (formSubmit)="addOfficeSup($event)"></wms-OfficeSup-info>',
  styles: ['']
})
export class OfficeSupAddComponent implements OnInit {

    officeSupId: string = '';
    userType: string;

    addOfficeSup(OfficeSupInfo: OfficeSupInfoModel) {
        this.os.addOfficeSup(OfficeSupInfo).subscribe(
            (data: boolean) => {
                if(data) {
                    this.nzMessage.success('办公用品添加成功!');
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

    constructor(private os: OfficeSupService, private nzMessage: NzMessageService, private router: Router,private activeRoute:ActivatedRoute) { }

  ngOnInit() {
      this.userType = this.activeRoute.snapshot.queryParams['userType'];
  }

}
