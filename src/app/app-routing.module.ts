import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]


@NgModule({
  declarations: [],
  imports: [
    //? Cuando es el router principal se usa forRoot y cuando es un router secundario se usa forChild
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
