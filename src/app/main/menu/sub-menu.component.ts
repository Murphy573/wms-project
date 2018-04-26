/**
 * write by @pengfei.li
 */
import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {NzSubMenuComponent} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'wms-submenu',
  template: `
    <li nz-menu-item *ngIf="!subMenu.children" (click)="itemClick(subMenu);" 
        [nzDisable]="!subMenu.router"
        [nzSelected]="subMenu.keyword === currentMenu">
      <span title>
         <i *ngIf="subMenu.iconClass" [ngClass]="getClass()"></i>
        <span >{{subMenu?.name}}</span>
      </span>
    </li>
    <li nz-submenu *ngIf="subMenu.children">
      <span title>
         <i *ngIf="subMenu.iconClass" [ngClass]="getClass()"></i>
        <span>{{subMenu?.name}}</span>
      </span>
      <ul>
        <wms-submenu
          [subMenu]="item"
          *ngFor="let item of subMenu.children"
        >
        </wms-submenu>
      </ul>
    </li>
  `,
})
export class SubMenuComponent implements OnInit, AfterViewInit{
  @Input() subMenu: any;
  @Input() currentMenu: string;
  @Input() subUserType: string;
  @Output() currentMenuChange = new EventEmitter<string>();

  level = 1;
  @ViewChildren(NzSubMenuComponent) nzSubMenus: QueryList<NzSubMenuComponent>;
  @ViewChildren(SubMenuComponent) subMenus: QueryList<SubMenuComponent>;

  getClass() {
    return this.subMenu.iconClass;
  }

  ngOnInit(): void {

  }

  itemClick(param) {
    if(!param.router) {
      return;
    }
    this.currentMenuChange.emit(param.keyword);
    this.router.navigate([param.router],{
      queryParams:{
        userType:this.subUserType
      }
    });
  }

  ngAfterViewInit() {
    if (this.subMenus.length) {
      this.subMenus
        .filter(x => x !== this)
        .forEach(menu => {
          setTimeout(_ => {
            menu.level = this.level + 1;
            menu.syncNzSubMenusLevel();
          });
        });
    }
  }

  syncNzSubMenusLevel() {
    if (this.nzSubMenus.length) {
      this.nzSubMenus
        .forEach(menu => {
          menu.level = this.level;
        });
    }
  }

  constructor( private router: Router,private ar:ActivatedRoute) {}

}
