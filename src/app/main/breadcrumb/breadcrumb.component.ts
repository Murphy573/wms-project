import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../shared/communication/communication.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-breadcrumb',
  styles: [``],
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item *ngFor="let item of items; let i = index;">
        <ng-container *ngIf="i === items.length-1">
          {{item.title}}
        </ng-container>
        <ng-container *ngIf="i !== items.length-1">
          <a routerLink="{{item.routerLink}}" [queryParams]="{userType:userType}">{{item.title}}</a>
        </ng-container>
      </nz-breadcrumb-item>
    </nz-breadcrumb>
  `
})
export class BreadcrumbComponent implements OnInit {

  items: any = [];
  userType:string;
  constructor(private update: CommunicationService,private ar:ActivatedRoute) { }

  ngOnInit() {
    this.update.breadcrumb$.subscribe((data: any) => {
      this.items = data.breadCrumbs;
    })
    this.ar.queryParams.subscribe(queryParams=>{
      this.userType=queryParams.userType;
    })
  }

}
