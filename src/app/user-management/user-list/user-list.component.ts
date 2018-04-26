import {Component, OnInit, ViewChild} from '@angular/core';
import {UserQueryParamsModel} from '../user-models/user-model';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserListTableComponent} from './user-list-table/user-list-table.component';
import {UserService} from '../user-services/user.service';

@Component({
  selector: 'wms-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(UserListTableComponent) list: UserListTableComponent;

  searchParams: UserQueryParamsModel = {
    account: '',
    departmentId: ''
  };

  selectedUserIds: Array<string> = [];

  refreshSelected(userIds) {
    //加入此行作用为：当子组件在刷新视图时，变更检测正在执行，期间会不停的引起detect，导致output值在不断更改，应当等刷新完成后再进行赋值
    setTimeout(() => {
      this.selectedUserIds = userIds;
    });

  }

  setSearchParams(param: UserQueryParamsModel): void {
      this.searchParams = param;
  }

  toAddUser() {
    this.router.navigate(['/main/user-management/user-add']);
  }

  toEditUser(userId: string) {
    this.router.navigate(['/main/user-management/user-edit'], {
      queryParams: {
        userId: userId,
      }
    });
  }

  deleteUsers() {
    this.nzModal.confirm({
      content: '确定要删除选中的用户吗?',
      okText: '确定',
      cancelText: '取消',
      showConfirmLoading: true,
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.us.deleteUsers(this.selectedUserIds).subscribe(
            (data: boolean) => {
              if(data) {
                this.list.queryUserList();
              }
              resolve();
            },
            (error) => {
              this.nzMessage.error(error.message);
              this.list.queryUserList();
              resolve();
            }
          )
        })
      }
    });
  }

  constructor(private router: Router, private nzModal: NzModalService, private nzMessage: NzMessageService, private us:UserService) { }

  ngOnInit() {
  }

}
