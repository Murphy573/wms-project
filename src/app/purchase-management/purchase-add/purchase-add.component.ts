/**
 * Created by xuming.jiang on 2018/3/5.
 */
import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';
import {PurchaseService} from '../purchase-services/purchase-service'
import {PurchaseInfoModel} from "../purchase-models/purchase-model";

@Component({
    selector: 'wms-purchase-add',
    template: '<wms-purchase-info [purchaseBatchParam]="purchaseBatch" (formSubmit)="addPurchase($event)"></wms-purchase-info>',
    styles: ['']
})

export class PurchaseAddComponent implements OnInit {
    purchaseBatch: string = '';
    userType: string;
    addPurchase(purchaseInfo: PurchaseInfoModel) {
        this.ps.addPurchase(purchaseInfo).subscribe(
            (data: boolean) => {
                if(data) {
                    this.nzMessage.success('资产添加成功!');
                    this.router.navigate(['/main/purchase-management'],{
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

    constructor(private ps: PurchaseService, private nzMessage: NzMessageService, private router: Router, private activeRoute:ActivatedRoute) { }

    ngOnInit() {
        this.userType = this.activeRoute.snapshot.queryParams['userType']
    }
}