import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { JointComponent } from './joint/joint.component';
import { RepairComponent } from './repair/repair.component';


//-----------------Services ---------------------------------
import { ApplicantService } from './services/applicant-service/applicant.service';
import { DeviceService } from './services/device-service/device.service';
import { RepairDetailService } from './services/repair-detail-service/repair-detail.service';
import { MomentModule } from 'angular2-moment';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutComponent,
    JointComponent,
    RepairComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule
  ],
  providers: [
    ApplicantService,
    DeviceService,
    RepairDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
