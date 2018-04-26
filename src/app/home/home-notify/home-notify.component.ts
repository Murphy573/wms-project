import { Component, OnInit } from '@angular/core';
import {HomeServiceService}  from '../services/home-service.service';
import {NzMessageService}    from 'ng-zorro-antd';
import {Notifications, notifyMockData}       from '../models/home-model';

@Component({
  selector: 'wms-home-notify',
  templateUrl: './home-notify.component.html',
  styleUrls: ['./home-notify.component.scss']
})
export class HomeNotifyComponent implements OnInit {

  notifies: Array<Notifications> = notifyMockData;

  queryNotify() {
    this.hs.getNotifications().subscribe(
      (data) => {
        console.log(data);
        this.notifies = data;
        //this.rebuildNotify(data);
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }


  constructor(private hs: HomeServiceService, private nzMessage: NzMessageService) { }

  ngOnInit() {
    this.queryNotify();
  }

}
