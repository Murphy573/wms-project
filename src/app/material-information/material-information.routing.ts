/**
 * Created by xuming.jiang on 2018/3/12.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MaterialMgrComponent} from "./material-mgr/material-mgr.component";
import {MaterialListComponent} from "./material-list/material-list.component";


const routes: Routes = [
    {
        path: '',
        component: MaterialMgrComponent,
        children: [
            {
                path: '',
                component: MaterialListComponent,
                data: {
                    breadCrumbs: [
                        {
                            title: '物资信息',
                            routerLink: '/main/material-information'
                        }
                    ],
                    menuKeyword: 'material-information'
                }
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule]
})
export class MaterialInformationRouting {}