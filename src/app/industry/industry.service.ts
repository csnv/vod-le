import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  private INDUSTRIES_ENDPOINT = '/industries';

  constructor(
    private httpClient: HttpClient
  ) { }

  getIndustries() {
    return this.httpClient.get(environment.api + this.INDUSTRIES_ENDPOINT);
  }
}
