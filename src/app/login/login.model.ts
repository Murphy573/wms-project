/**
 * write by @pengfei.li
 */
import {UserTypeModel} from '../user-management/user-models/user-model';

export interface LoginInfo {
  account: string;
  password: string;
}

export interface LoginToken {
  //用户Id
  id: string;
  //用户账号
  account: string;
  //用户密码
  password: string;
  //用户类型
  userType: UserTypeModel;
  //tokenId
  token: string;
  //所属部门
  department: string;
}
