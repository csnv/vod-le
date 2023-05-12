import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndustryComponent } from './industry/industry.component';
import { DeviceComponent } from './device/device.component';

import { industriesReducer } from './state/reducers/industries.reducer';
import { IndustriesEffects } from './state/effects/industries.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IndustryComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ industries: industriesReducer}),
    EffectsModule.forRoot([IndustriesEffects])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
