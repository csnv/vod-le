import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryComponent } from './industry/industry.component';
import { HomeComponent } from './home/home.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'industries',
    component: IndustryComponent
  },
  {
    path: 'devices',
    component: DeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
