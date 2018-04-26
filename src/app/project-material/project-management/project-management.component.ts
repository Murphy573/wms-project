import {Component, OnInit, ViewChild}     from '@angular/core';
import {ProjectInfo}                      from '../project-material-models';
import {ProjectMaterialService}           from '../services/project-material.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ProjectListComponent}             from './project-list/project-list.component';
import {Observable}                       from 'rxjs/Observable';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'wms-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  selectedProjects: Array<string> = [];

  userType:string;

  @ViewChild(ProjectListComponent) listComponent: ProjectListComponent;

  refreshSelected(list) {
    setTimeout(() => {
      this.selectedProjects = list;
    });
  }

  deleteProjects() {
    this.nzModal.confirm({
      content: '确定要删除选中的项目吗?',
      okText: '确定',
      cancelText: '取消',
      showConfirmLoading: true,
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.pms.deleteProject(this.selectedProjects).toPromise().then(
            (data: boolean) => {
              if (data) {
                this.listComponent.queryProjectList();
              }
              resolve();
            }
          )
            .catch((error) => {
              this.nzMessage.error(error.message);
              resolve();
            })
        })
      }
    });

  }

  projectInfo: ProjectInfo = null;

  isEdit: boolean;//是否是编辑
  initAddProject() {
    this.projectInfo = {
      id:'',
      projectName: '',
      projectCode: '',
      isDeliver:''
    };
    this.isEdit = false;
    this.isVisible = true;
  }

  initEditProject(project: ProjectInfo) {
    this.projectInfo = {
      id:project.id,
      projectCode: project.projectCode,
      isDeliver:project.isDeliver,
      projectName: project.projectName
    };
    this.isEdit = true;
    this.isVisible = true;
  }

  submitForm() {
    this.isConfirmLoading = true;
    this.submit().subscribe(
      (data) => {
        if(data) {
          this.isConfirmLoading = false;
          this.closeModal();
          this.listComponent.queryProjectList();
        }
      },
      (error) => {
        this.isConfirmLoading = false;
        this.nzMessage.error(error.message);
      }
    );
  }

  submit(): Observable<boolean> {
    if(this.isEdit) {
      return this.pms.editProject(this.projectInfo);
    }
    return this.pms.addProject(this.projectInfo);
  }


  isVisible: boolean = false;
  isConfirmLoading: boolean = false;
  closeModal() {
    this.projectInfo = null;
    this.isVisible = false;
  }

  ValidateStatus(isDirty, key): string {
    if (!isDirty) {
      return '';
    }
    else {
      if (this.projectInfo[key]) {
        return 'success';
      }
      return 'error';
    }
  }

  //项目是否交付
  projectDelivery: Array<{code: number, label: string}> = [
   {
   code: 1,
   label: '已交付'
   },
   {
   code: 0,
   label: '未交付'
   }
   ];

  constructor(
    private pms: ProjectMaterialService,
    private nzMessage: NzMessageService,
    private nzModal: NzModalService,
    private activeRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.userType = queryParams.userType
    })
  }

}
