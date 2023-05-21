import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndustryComponent } from './industry/industry.component';
import { DeviceComponent } from './device/device.component';

import { HttpClientModule } from '@angular/common/http';
import { IndustryListComponent } from './industry/industry-list/industry-list.component';
import { HeaderComponent } from './header/header.component';
import { SortPipe } from './shared/sort/sort.pipe';
import { IndustryDialogComponent } from './industry/industry-dialog/industry-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IndustryComponent,
    DeviceComponent,
    IndustryListComponent,
    HeaderComponent,
    SortPipe,
    IndustryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
