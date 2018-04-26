import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup}    from '@angular/forms';
import {AssetTypeModel}            from '../../asset-management/asset-models/asset-model';
import {AssetService}              from '../../asset-management/asset-services/asset.service';
import {NzMessageService}          from 'ng-zorro-antd';
import {BorrowModel}               from '../models/home-model';
import {HomeServiceService}        from '../services/home-service.service';

@Component({
  selector: 'wms-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.scss']
})
export class HomeTableComponent implements OnInit {

  searchGroup: FormGroup;

  typeList: AssetTypeModel[] = [];

  borrowList: BorrowModel[] = [];

  createForm() {
    this.searchGroup = this.fb.group({
      name: [''],
      owner: [''],
      typeId: [''],
      assetCode: [''],
      startTime: [null],
      endTime: [null],
    });
  }

  queryTypeList() {
    this.as.getAssetTypeList().subscribe(
      (data) => {
        this.typeList = data as Array<AssetTypeModel>;

      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  queryBorrowList(flag?: string) {
    if(flag === 'search') {
      this.pageParam.currentPage = 1;
    }
    this.hs.getBorrowRecord(this.searchGroup.value).subscribe(
      (data) => {
        this.borrowList = data;
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  queryJudgeLogin(){
    this.hs.judgeLogin().subscribe(
        (data) =>{
          if(data===true){
            this.nzMessage.success("请到用户管理界面修改初始密码！");
          }
        },
        (error) =>{
          this.nzMessage.error(error.message);
        }
    );
  }

  _search() {
    this.queryBorrowList('search');
  }

  constructor(private fb: FormBuilder,
              private as: AssetService,
              private hs: HomeServiceService,
              private nzMessage: NzMessageService,
              @Inject('PAGE_PARAM_INIT') public pageParam,) {
    this.pageParam = Object.assign({}, this.pageParam);
  }

  ngOnInit() {
    this.createForm();
    this.queryTypeList();
    this.queryBorrowList();
    this.queryJudgeLogin();
  }

}
