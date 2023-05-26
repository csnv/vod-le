import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SortPipe } from './shared/pipes/sort/sort.pipe';
import { PaginatePipe } from './shared/pipes/paginate/paginate.pipe';

import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { IndustryComponent } from './industry/industry.component';
import { IndustryListComponent } from './industry/industry-list/industry-list.component';
import { IndustryDialogComponent } from './industry/industry-dialog/industry-dialog.component';

import { DeviceComponent } from './device/device.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    IndustryComponent,
    DeviceComponent,
    IndustryListComponent,
    HeaderComponent,
    SortPipe,
    IndustryDialogComponent,
    PaginatePipe,
    PaginationComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
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
