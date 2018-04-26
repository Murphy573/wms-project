import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute}                                         from '@angular/router';

@Component({
  selector: 'wms-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  //标题
  @Input() gTitle: string = '';
  //点击设置导航的路由
  @Input() gRouter: string = '';
  //展示数组中某个字段
  @Input() gDisplay: string = '';
  //根据属性gTrackBy提高列表性能
  @Input() gTrackBy: string = '';
  //搜索
  @Output() gSearch: EventEmitter<object> = new EventEmitter<object>();
  //数据
  _gData: Array<object> = [];
  @Input()
  set gData(data: Array<object>) {
    if(!Array.isArray(data)) {
      this._gData = [];
      return;
    }
    let [...final] = data;

    this.allGroup[this.gDisplay] = '全部分组';

    final.unshift(this.allGroup);
    this._gData = final;
    this.search();
  }

  allGroup = {'my-all-flag': 'ALL'};

  selected: object;
  select(item: object) {
    if(item === this.selected){
      return ;
    }
    this.selected = item;
    this.gSearch.emit(item);
  }

  userType:string;
  navigationGroup(e: MouseEvent) {
    e.stopPropagation();
    this.router.navigate([this.gRouter],{
      queryParams:{
        userType:this.userType
      }
    });
  }

  _searchData: Array<object> = [];//搜索后的数据列表
  _searchValue: string = '';//搜索的值:本地搜索
  search() {
    this._searchData.splice(0);
    this._searchData = this._gData.filter((data) => {
      return data[this.gDisplay].indexOf(this._searchValue) > -1
    });
  }

  trackByFn(index, item) {
    if(this.gTrackBy === '') {
      return index;
    }
    return item[this.gTrackBy];
  }

  constructor(private router: Router,private ar:ActivatedRoute) { }

  ngOnInit() {
    this.selected = this.allGroup;
    this.ar.queryParams.subscribe(queryParams=>{
      this.userType = queryParams.userType;
    })
  }

}
