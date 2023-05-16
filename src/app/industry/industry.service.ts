import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Industry } from './industry.model';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  private industries: Industry[] = [];
  private INDUSTRIES_ENDPOINT = '/industries';

  constructor(
    private httpClient: HttpClient
  ) {
    this.init();
  }
  
  init() {
    this.fetchIndustries().subscribe((response) => {
      this.industries = response as Industry[];
    });
  }

  fetchIndustries() {
    return this.httpClient.get(environment.api + this.INDUSTRIES_ENDPOINT);
  }

  getIndustries() {
    return [...this.industries];
  }

  addIndustry(industry: Industry) {
    const clone = { ...industry };
    this.industries.push(clone);
  }

  updateIndustry(industry: Industry) {
    const clone = { ...industry };
    const index = this.industries.findIndex(_industry => _industry.id === clone.id);
    
    this.industries[index] = clone;
  }
}
