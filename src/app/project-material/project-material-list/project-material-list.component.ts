import { Component, OnInit }    from '@angular/core';
import {AssetQueryParamsModel}  from '../../asset-management/asset-models/asset-model';
import {ProjectInfo, searchProgectMatParams}            from '../project-material-models';
import {ProjectMaterialService} from '../services/project-material.service';
import {NzMessageService}       from 'ng-zorro-antd';

@Component({
  selector: 'wms-project-material-list',
  templateUrl: './project-material-list.component.html',
  styleUrls: ['./project-material-list.component.scss']
})
export class ProjectMaterialListComponent implements OnInit {

  groupDisplay: string = 'projectName';

  searchParams: searchProgectMatParams  = {
    projectId: '',
    statusId: '',
    typeId: '',
    sourceTypeId: ''
  }



  groupSearch(p) {
    if(p['my-all-flag'] === 'ALL') {
      this.searchParams.projectId = '';
    }
    else {
      this.searchParams.projectId = p.projectCode;
    }
    this.searchParams = Object.assign({} ,this.searchParams);
  }

  setSearchParams(param: searchProgectMatParams) {
    this.searchParams = Object.assign({} ,this.searchParams, param);
  }

  projectList: Array<ProjectInfo> = [];
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

  constructor(private pms: ProjectMaterialService, private nzMessage: NzMessageService) { }

  ngOnInit() {
    this.queryProjectList();
  }

}
