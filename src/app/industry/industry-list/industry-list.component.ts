import { Component, Input, OnInit } from '@angular/core';
import { Industry } from '../industry.model';
import { IndustryService } from '../industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss']
})
export class IndustryListComponent implements OnInit {
  industries: Industry[] = [];

  sortingField = 'name';
  sortingDir = -1;

  constructor(
    private industryService: IndustryService
  ) {}

  ngOnInit(): void {
    this.industryService.getIndustries().subscribe(industries => {
      this.industries = industries;
    });
  }

  onModify(item: Industry) {

  }

  onDelete(item: Industry) {
    this.industryService.removeIndustry(item);
  }

  onAdd() {
    this.industryService.add("Pepe");
  }
  
}
