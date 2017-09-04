import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

import { AboutComponent } from './about/about.component';

import { JointComponent } from './joint/joint.component';

import { RepairComponent } from './repair/repair.component';

import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'joint',
    component: JointComponent
  },
  {
    path: 'repair',
    component: RepairComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
