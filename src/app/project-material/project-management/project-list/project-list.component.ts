import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ProjectInfo}                                     from '../../project-material-models';
import {ProjectMaterialService}                          from '../../services/project-material.service';
import {NzMessageService}                                from 'ng-zorro-antd';
import {CheckedInfo, TableCheckboxService}               from '../../../shared/common/table-checkbox.service';

@Component({
  selector: 'wms-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList: Array<ProjectInfo> = [];

  _displayProjectList: Array<ProjectInfo> = [];

  @Output('selected') _selected = new EventEmitter<Array<string>>();

  @Output('editData') editProject = new EventEmitter<ProjectInfo>();

  toEdit(data: ProjectInfo) {
    this.editProject.emit(data);
  }

  queryProjectList() {
    this.pms.getProjectList().subscribe(
      (data) => {
        this.projectList = data;
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  checkedInfo: CheckedInfo = {
    allCheck: false,
    indeterminate: false,
    selectedList: []
  };

  refreshDisplay($event) {
    this.formatChecked();
    this._displayProjectList = $event;
  }

  //单选
  _checkOne() {
    this.checkedInfo = this.tCheck.selectOne(this._displayProjectList);
    this.emitSelected();
  }

  //全选
  _checkAll(value) {
    this.checkedInfo = this.tCheck.selectAll(this._displayProjectList, value);
    this.emitSelected();
  }

  private emitSelected() {
    this._selected.emit(this.checkedInfo.selectedList.map(v => v.projectCode));
  }

  private formatChecked() {
      this.projectList.forEach(v => v.checked = false);
  }


  constructor(private pms: ProjectMaterialService,
              private nzMessage: NzMessageService,
              @Inject('PAGE_PARAM_INIT') public pageParam,
              private tCheck: TableCheckboxService) {
    this.pageParam = Object.assign({}, this.pageParam);
  }

  ngOnInit() {
    this.queryProjectList();
  }

}
