import { Component, OnInit } from '@angular/core';
import {Menus} from '../../shared/config/menu-config';
import {CommunicationService} from '../../shared/communication/communication.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  menus: any = Menus;
  currentMenu: string = '';
  userType: string;

  change(data) {
    this.currentMenu = data;
  }

  constructor( private comm: CommunicationService,private ar:ActivatedRoute) {}

  ngOnInit() {
    this.comm.breadcrumb$.subscribe((data: any) => {
      this.currentMenu = data.menuKeyword as string;
    });

    this.ar.queryParams.subscribe(queryParams=>{
      this.userType=queryParams.userType;
    })
  }


}
