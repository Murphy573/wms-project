/**
 * write by @pengfei.li
 */

export interface AssetStatusRatio {
  usingRatio: number;//	在用状态比
  idleRatio: number;//	闲置状态比
  borrowRatio: number;//	借出状态比
  repaireRatio: number;//	报修状态比
  scrapRatio: number;//	报废状态比
}

export interface InventoryRatio {
  suinventoryRatio: number;//	SU库存
  suoutRatio: number;//	SU出库
  iominventoryRatio: number;//	IOM库存
  iomoutRatio: number;//	IOM出库
}

export interface AssetRatio {
  assetsStatusRatios: AssetStatusRatio;
  inventoryRatios: InventoryRatio;
}

export interface Notifications {
  assetName?: string;//	资产名称
  assetCode?: string;//资产编号
  officeSupName?: string;//	办公用品名称
  purchaseBatch?: string;//采购批次
  days?: number;//	到期天数
  inventory?: number;//	库存少于多少
}

export interface PieOptions {
  title?: string;
  series?: Array<{ name: string; value: number }>;
  legend?: string[];
}


export interface BorrowModel {
  id?: string;//	借还记录id
  assetName?: string;//	资产名
  assetCode?: string;//	资产编号
  assetsId?: string;//	资产id
  assetsTypeId?: string;//	资产类别id
  assetsTypeName?: string;//	资产类别名
  name?: string;//	借出人
  borrowTime?: Date;	//借出时间
  returnTime?: Date;//	归还时间
}

export const notifyMockData: Array<Notifications> = [
  /*{
    assetName: '资产1',
    assetCode: 'a000001',
    officeSupNames: '',
    purchaseBatch: '',
    days: 1,
    inventory: 1
  },
  {
    assetName: '资产2',
    assetCode: 'a000002',
    officeSupNames: '',
    purchaseBatch: '',
    days: 3,
    inventory: 1
  },
  {
    assetName: '',
    assetCode: '000002',
    officeSupNames: '办公用品1',
    purchaseBatch: 'b000001',
    days: 3,
    inventory: 10
  },
  {
    assetName: '',
    assetCode: '000002',
    officeSupNames: '办公用品2',
    purchaseBatch: 'b000002',
    days: 3,
    inventory: 0
  }*/
];
