/**
 * write by @pengfei.li
 */
import {Injectable} from '@angular/core';

@Injectable()
export class TableCheckboxService {
  constructor() {}

  public selectOne(list: Array<any>): CheckedInfo {
    const allChecked = list.every(value => value.checked === true);
    const allUnChecked = list.every(value => !value.checked);
    let _selectList = list.filter(value => value.checked === true);
    return {
      allCheck: allChecked,
      indeterminate: (!allChecked) && (!allUnChecked),
      selectedList: _selectList
    }
  }

  public selectAll(list: Array<any>, flag): CheckedInfo {
    if (flag) {
      list.forEach(data => {
        data.checked = true;
      });
    } else {
      list.forEach(data => {
        data.checked = false;
      });
    }
    return this.selectOne(list);
  }
}


export class CheckedInfo {
  allCheck: boolean;
  indeterminate: boolean;
  selectedList: Array<any>;
}
