/**
 * write by @pengfei.li
 */
import {Injectable}                       from '@angular/core';
import {HttpClient}                       from '@angular/common/http';
import {Observable}                       from 'rxjs/Observable';
import {Pagination}                       from '../../shared/models/Pagination';
import {ProjectInfo, ProjectMaterialInfo} from '../project-material-models';
import {AssetQueryParamsModel}            from '../../asset-management/asset-models/asset-model';

@Injectable()
export class ProjectMaterialService {
  constructor(private http: HttpClient) {}

  public getProjectMaterialList(param: AssetQueryParamsModel): Observable<Pagination<ProjectMaterialInfo>> {
    return this.http.post<Pagination<ProjectMaterialInfo>>('usmart/projectMgr/findMaterialsLists', param);
  }

  public getProjectList(): Observable<Array<ProjectInfo>>  {
    return this.http.post<Array<ProjectInfo>>('usmart/projectMgr/showProjects', null);
  }

  public addProject(project: ProjectInfo): Observable<boolean> {
    return this.http.post<boolean>('usmart/projectMgr/addProject', project);
  }

  public editProject(project: ProjectInfo): Observable<boolean> {
    return this.http.post<boolean>('usmart/projectMgr/updateProject', project);
  }

  public deleteProject(data: Array<string>): Observable<boolean> {
    return this.http.post<boolean>('usmart/projectMgr/deleteProject', data);
  }
}
