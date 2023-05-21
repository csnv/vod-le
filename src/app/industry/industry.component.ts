import { Component, OnInit } from '@angular/core';

import { Industry } from './industry.model';
import { IndustryService } from './industry.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent {
  constructor(
    private industryService: IndustryService
  ) {}
}