/**
 * Created by xuming.jiang on 2018/3/5.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wms-purchase-mgr',
    template: `<router-outlet></router-outlet>`,
    styles: [
        `
      .purchase-management-container {
        width: 100%;
        height: 100%;
      }
    `
    ]
})
export class PurchaseMgrComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}