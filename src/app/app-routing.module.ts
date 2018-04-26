import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CanLoadService} from './shared/guard/can-load.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'main',
    loadChildren: 'app/main/main.module#MainModule',
    canLoad: [CanLoadService]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
