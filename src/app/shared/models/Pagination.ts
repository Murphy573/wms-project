/**
 * write by @pengfei.li
 */

export class Pagination<T> {
  pageSize: number;
  currentPage: number;
  begin: number;
  end: number;
  totalCount: number;
  resultList: Array<T>;
}

export class PageParams {
  pageSize?: number;
  currentPage?: number;
  totalCount?: number;
}
