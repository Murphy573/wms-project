import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {CommunicationService} from './shared/communication/communication.service';

@Component({
  selector: 'wms-root',
  template: `
    <div class="full-screen">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [` `]
})
export class AppComponent implements OnInit{

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private comm: CommunicationService) {}

  ngOnInit(): void {
    this.router.events
      //过滤导航成功后
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
          this.comm.updateBreadcrumb(event);
      });
  }
}
