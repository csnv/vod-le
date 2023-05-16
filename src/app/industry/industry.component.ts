import { Component, OnInit } from '@angular/core';

import { Industry } from './industry.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {
  obs!: Observable<Industry[]>;
  busy = true;

  constructor(
  ) {}

  ngOnInit() {
  }
}
