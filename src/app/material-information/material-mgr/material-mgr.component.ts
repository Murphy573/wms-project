/**
 * Created by xuming.jiang on 2018/3/12.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wms-material-mgr',
    template: `
    <router-outlet></router-outlet>
  `,
    styles: [
        `
      .material-management-container {
        width: 100%;
        height: 100%;
      }
    `
    ]
})
export class MaterialMgrComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}