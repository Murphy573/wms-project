/**
 * Created by xuming.jiang on 2018/3/5.
 */
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {PurchaseInfoModel} from "../purchase-models/purchase-model";
import {PurchaseService} from "../purchase-services/purchase-service";


@Component({
    selector: 'wms-purchase-edit',
    template: '<wms-purchase-info [purchaseBatchParam]="purchaseBatch"  (formSubmit)="editPurchase($event)"></wms-purchase-info>',
    styles: ['']
})

export class PurchaseEditComponent implements OnInit {

    purchaseBatch: string;
    userType:string;
    editPurchase(purchaseInfo: PurchaseInfoModel) {
        this.as.editPurchaseInfo(purchaseInfo).subscribe(
            (data: boolean) => {
                if(data) {
                    this.nzMessage.success('采购编辑成功!');
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

    constructor(private activeRoute: ActivatedRoute,
                private as: PurchaseService,
                private nzMessage: NzMessageService,
                private router: Router)
    { }

    ngOnInit() {
        this.purchaseBatch = this.activeRoute.snapshot.queryParams['purchaseBatch']
        this.userType = this.activeRoute.snapshot.queryParams['userType']
    }

}