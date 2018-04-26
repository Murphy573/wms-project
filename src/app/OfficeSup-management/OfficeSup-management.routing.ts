/**
 * Created by xuming.jiang on 2018/2/27.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OfficeSupMgrComponent} from './OfficeSup-mgr/OfficeSup-mgr.component';
import {OfficeSupListComponent} from "./OfficeSup-list/OfficeSup-list.component";
import {OfficeSupEditComponent} from "./OfficeSup-edit/OfficeSup-edit.component";
import {OfficeSupAddComponent} from "./Office-sup-add/Office-sup-add.component";

const routes: Routes = [
    {
        path:'',
        component:OfficeSupMgrComponent,
        children:[
            {
                path:'',
                component:OfficeSupListComponent,
                data:{
                    breadCrumbs:[
                        {
                            title:'办公用品管理',
                            routerLink:'/main/OfficeSup-management'
                        }
                    ],
                    menuKeyword: 'OfficeSup-management'
                }

            },
            {
                path:'OfficeSup-add',
                component:OfficeSupAddComponent,
                data:{
                    breadCrumbs:[
                        {
                            title:'办公用品管理',
                            routerLink:'/main/OfficeSup-management'
                        },
                        {
                            title:'新增办公用品'
                        }
                    ],
                    menuKeyword: 'OfficeSup-management'
                }

            },
            {
                path:'OfficeSup-edit',
                component:OfficeSupEditComponent,
                data:{
                    breadCrumbs:[
                        {
                            title:'办公用品管理',
                            routerLink:'/main/OfficeSup-management'
                        },
                        {
                            title:'编辑办公用品',
                        }
                    ],
                    menuKeyword: 'OfficeSup-management'
                }
            }
        ]
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule]
})
export class OfficeSupManagementRouting {}