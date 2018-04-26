import {Component, EventEmitter, OnInit, Output}                 from '@angular/core';
import {FormBuilder, FormGroup}                                  from '@angular/forms';
import {NzMessageService}                                        from 'ng-zorro-antd';
import {SourceTypes}                                             from '../../project-material-models';
import {AssetQueryParamsModel, AssetStatusModel, AssetTypeModel} from '../../../asset-management/asset-models/asset-model';
import {AssetService}                                            from '../../../asset-management/asset-services/asset.service';

@Component({
  selector: 'wms-project-material-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() startSearch = new EventEmitter<AssetQueryParamsModel>();

  searchForm: FormGroup;

  sourceTypeList = SourceTypes;

  createSearchForm() {
    this.searchForm = this.fb.group({
      statusId: [''],
      sourceTypeId: [''],
      typeId: ['']
    });
  }

  _search() {
    this.startSearch.emit(this.searchForm.value as AssetQueryParamsModel);
  }

  typeList: Array<AssetTypeModel> = [];
  queryTypeList() {
    this.as.getAssetTypeList().subscribe(
      (data) => {
        this.typeList = data;
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  statusList: Array<AssetStatusModel> = [];
  queryStatusList() {
    this.as.getAssetStatus().subscribe(
      (data) => {
        this.statusList = data as Array<AssetStatusModel>;
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  constructor( private fb: FormBuilder,
               private as: AssetService,
               private nzMessage: NzMessageService) { }

  ngOnInit() {
    this.createSearchForm();
    this.queryStatusList();
    this.queryTypeList();
  }
}
