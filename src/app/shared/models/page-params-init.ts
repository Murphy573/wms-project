/**
 * write by @pengfei.li
 */
import {InjectionToken} from '@angular/core';
import {PageParams} from './Pagination';

export let INIT_PAGE_PARAMS = {
  currentPage: 1,
  pageSize: 15,
  totalCount: 0
};

export let PAGE_PARAM_INIT = new InjectionToken<PageParams>('');
