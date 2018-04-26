/**
 * Created by xuming.jiang on 2018/3/5.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PurchaseMgrComponent} from "./purchase-mgr/purchase-mgr.component";
import {PurchaseListComponent} from "./purchase-list/purchase-list.component";
import {PurchaseAddComponent} from "./purchase-add/purchase-add.component";
import {PurchaseEditComponent} from "./purchase-edit/purchase-edit.component";



const routes: Routes = [
    {
        path:'',
        component:PurchaseMgrComponent,
        children:[
            {
                path:'',
                component:PurchaseListComponent,
                data:{
                    breadCrumbs:[
                        {
                            title:'采购管理',
                            routerLink:'/main/purchase-management'
                        }
                    ],
                    menuKeyword: 'purchase-management'
                }
            },
            {
                path:'purchase-add',
                component:PurchaseAddComponent,
                data:{
                    breadCrumbs:[
                        {
                            title:'采购管理',
                            routerLink:'/main/purchase-management'
                        },
                        {
                            title:'新增采购',
                        }
                    ],
                    menuKeyword: 'purchase-management'
                }
            },
            {
                path:'purchase-edit',
                component:PurchaseEditComponent,
                data:{
                    breadCrumbs:[
                        {
                            title:'采购管理',
                            routerLink:'/main/purchase-management'
                        },
                        {
                            title:'编辑采购',
                        }
                    ],
                    menuKeyword: 'purchase-management'
                }
            },

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseManagementRouting {}