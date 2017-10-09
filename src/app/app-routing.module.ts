import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

import { AboutComponent } from './about/about.component';

import { JointComponent } from './joint/joint.component';

import { RepairComponent } from './repair/repair.component';

import { PricingComponent } from './pricing/pricing.component';

import { AffiliateComponent } from './affiliate/affiliate.component';

import { FaqComponent } from './faq/faq.component';

import { GuaranteeComponent } from './guarantee/guarantee.component';

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
  },
  {
    path: 'affiliate',
    component: AffiliateComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'guarantee',
    component: GuaranteeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
