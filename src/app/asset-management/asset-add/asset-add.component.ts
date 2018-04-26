import { Component, OnInit } from '@angular/core';
import {AssetInfoModel} from '../asset-models/asset-model';
import {AssetService} from '../asset-services/asset.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'wms-asset-add',
  template: '<wms-asset-info [assetCode]="assetCode" (formSubmit)="addAsset($event)"></wms-asset-info>',
  styles: ['']
})
export class AssetAddComponent implements OnInit {

  assetCode: string = '';
  userType: string;

  addAsset(assetInfo: AssetInfoModel) {
    this.as.addAsset(assetInfo).subscribe(
      (data: boolean) => {
          if(data) {
            this.nzMessage.success('资产添加成功!');
            this.router.navigate(['/main/asset-management'],{
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

  constructor(private as: AssetService, private nzMessage: NzMessageService, private router: Router,private ar:ActivatedRoute) { }

  ngOnInit() {
    this.userType = this.ar.snapshot.queryParams['userType']
  }

}
