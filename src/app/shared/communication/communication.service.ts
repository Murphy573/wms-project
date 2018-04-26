import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CommunicationService {

  private breadcrumb = new Subject();
  public breadcrumb$ = this.breadcrumb.asObservable();

  updateBreadcrumb(param) {
    setTimeout( () => {
      this.breadcrumb.next(param);
    })
  }
  constructor() { }

}
