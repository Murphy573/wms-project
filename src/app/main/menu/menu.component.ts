import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-menu',
  styleUrls: ['./menu.component.scss'],
  template: `
    <div class="menu-container">
      <ul nz-menu [nzMode]="'inline'" [nzTheme]="'dark'" [nzInlineCollapsed]="isCollapsed">
          <wms-submenu *ngFor="let menu of menus" [subMenu]="menu" [subUserType]="subUserType" [currentMenu]="currentMenu" (currentMenuChange)="change($event)"></wms-submenu>
      </ul>
    </div>
  `
})
export class MenuComponent implements OnInit {

  @Input() menus: any[];
  @Input() currentMenu: string;
  @Input() subUserType: string;

  @Output() currentMenuChange = new EventEmitter<string>();

  change(data) {
    this.currentMenuChange.emit(data);
  }

  isCollapsed: boolean = false;

  constructor(private ar:ActivatedRoute) { }

  ngOnInit() {
    this.ar.queryParams.subscribe(queryParams=>{
      if(queryParams.userType=="NORMAL_USER"){
         this.menus = this.menus.slice(0,6);
      }
    })
  }

}
