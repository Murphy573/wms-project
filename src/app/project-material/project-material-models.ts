/**
 * write by @pengfei.li
 */

export {AssetSourceTypes as SourceTypes} from '../asset-management/asset-models/asset-model'


export interface ProjectMaterialInfo {
  assetId?: string;// 资产id
  officeSupId?: string;// 办公用品id
  name?: string;// 物资名称
  type?: string;// 物资类型
  status?: string;//  物资状态
  taxPoint?: number;//  税率
  price?: number;//  单价
  amount?: number;// 数量
  totalPrice?: number;//  总计
  owner?: string;// 负责人
  sourceTypeId?: string;// 资产来源类型id
  purchaseBatch?: string;// 购买批次
  inputTime?: Date// 入库时间
  projectDelivery?: number;// 项目交付:1-已交付,0-未交付
  remark?: string;//  备注
  [key: string]: any;
}

export interface ProjectInfo {
  id?:string;
  projectCode?: string;//;//	项目编号
  projectName?: string;//;//	项目名称
  checked?: boolean;
  remark?: string;//;//	备注
  projectDelivery?: number;//	项目交付?:1-已交付,0-未交付
  isDeliver?:'';//项目交付
}

export interface searchProgectMatParams{
  projectId?:string,
  statusId?:string,
  typeId?: string,
  sourceTypeId?:string
}
