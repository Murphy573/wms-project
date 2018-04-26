import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {AssetService} from '../asset-services/asset.service';
import {AssetInfoModel} from '../asset-models/asset-model';

@Component({
  selector: 'wms-asset-edit',
  template: '<wms-asset-info [assetCode]="assetCode" (formSubmit)="editAsset($event)"></wms-asset-info>',
  styles: ['']
})
export class AssetEditComponent implements OnInit {

  assetCode: string;
  userType: string;

  editAsset(assetInfo: AssetInfoModel) {
    this.as.editAssetInfo(assetInfo).subscribe(
      (data: boolean) => {
        if(data) {
          this.nzMessage.success('资产编辑成功!');
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

  constructor(private activeRoute: ActivatedRoute,
              private as: AssetService,
              private nzMessage: NzMessageService,
              private router: Router)
  { }

  ngOnInit() {
    this.assetCode = this.activeRoute.snapshot.queryParams['assetCode']
    this.userType = this.activeRoute.snapshot.queryParams['userType']
  }

}
