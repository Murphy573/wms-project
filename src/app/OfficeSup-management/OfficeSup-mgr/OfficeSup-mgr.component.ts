/**
 * Created by xuming.jiang on 2018/2/27.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wms-OfficeSup-mgr',
    template: `
    <router-outlet></router-outlet>
  `,
    styles: [
        `
      .OfficeSup-management-container {
        width: 100%;
        height: 100%;
      }
    `
    ]
})
export class OfficeSupMgrComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
