import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'wms-asset-mgr',
  template: `
    <!--<div class="asset-management-container">
      asset-mgr works!
      <button routerLink="/main/asset-management">列表</button>
      <button routerLink="/main/asset-management/asset-detail">详情</button>
      <div>
        <router-outlet></router-outlet>
      </div>

    </div>-->
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .asset-management-container {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class AssetMgrComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
