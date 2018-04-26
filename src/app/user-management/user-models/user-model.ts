/**
 * write by @pengfei.li
 */
import {PageParams} from '../../shared/models/Pagination';

export interface UserDepartmentModel {
  departmentId?: string;
  departmentName?: string;
}

export interface UserPasswordModel {
  userId?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface UserTypeModel {
  userTypeName?: string;
  userTypeId?: string;
}

export interface UserInfoModel extends UserDepartmentModel, UserTypeModel {
  userId?: string;
  account?: string;
  phone?: string;
  password?: string;
  otherConnect?: string;
  comment?: string;
  createTime?: Date;
  lastModifyTime?: Date;
  firstLogin?: string;
  [key: string]: any;

}

export class UserQueryParamsModel extends PageParams{
  account?: string;
  departmentId?: string;
}
