import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Industry } from './industry.model';
import { Observable, tap } from 'rxjs';
import { IndustriesApiActions } from '../state/actions/industries.actions';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {
  obs!: Observable<Industry[]>;
  busy = true;

  constructor(
    private store: Store<{ industries: Industry[] }>
  ) {}

  ngOnInit() {
    this.obs = this.store.select("industries");
    this.obs.subscribe(o => console.log(o));

    this.store.dispatch(IndustriesApiActions.getIndustriesListRequest());
  }
}
