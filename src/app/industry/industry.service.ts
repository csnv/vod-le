import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Industry } from './industry.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  /* Industry API endpoint */
  private INDUSTRIES_ENDPOINT = '/industries';
  /* List of industry elements */
  private industries: Industry[] = [];
  /* Subject for ngrx style data consumption */
  private industriesSub = new BehaviorSubject<Industry[]>(this.industries);

  constructor(
    private httpClient: HttpClient
  ) {
    this.fetch();
  }

  /**
   * Retrieve data on initialization
   */
  fetch(): void {
    this.fetchIndustries().subscribe((response) => {
      this.industries = response as Industry[];
      this.industriesSub.next([...this.industries]);
    });
  }

  /**
   * Fetch list of industries
   * @returns List of industries
   */
  private fetchIndustries() {
    return this.httpClient.get(environment.api + this.INDUSTRIES_ENDPOINT);
  }

  /**
   * Retrieves subject of the current list of industries
   */
  public getIndustries() {
    return this.industriesSub;
  }

  /**
   * Clones the desired industry element and adds it to the industry stack
   * @param industry Industry item
   */
  public addIndustry(industry: Industry) {
    const clone = { ...industry };
    this.industries.push(clone);
    this.propagate();
  }

  /**
   * Clones the desired industry element and replaces it in the industry stack
   * @param industry Industry item
   */
  public updateIndustry(industry: Industry) {
    const clone = { ...industry };
    const index = this.industries.findIndex(_industry => _industry.id === clone.id);
    
    this.industries[index] = clone;
    this.propagate();
  }

  public removeIndustry(industry: Industry) {
    this.industries = this.industries.filter(item => item.id !== industry.id);

    this.httpClient.delete(environment.api + this.INDUSTRIES_ENDPOINT + `/${industry.id}`)
      .subscribe(() => {
        this.propagate();
      });
  }

  public add(name: string) {
    this.httpClient.post(environment.api + this.INDUSTRIES_ENDPOINT, {
      body: {
        name: name
      }
    }).subscribe((response) => console.log(response));
  }

  /**
   * Propagate copy of industries list through subject
   */
  private propagate() {
    this.industriesSub.next([...this.industries]);
  }
}
