import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IndustriesApiActions } from "../actions/industries.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { IndustryService } from "src/app/industry/industry.service";
import { Industry } from "src/app/industry/industry.model";

@Injectable()
export class IndustriesEffects {
  constructor(
    private action: Actions,
    private industryService: IndustryService
  ) {}

  getIndustries = createEffect(() =>
    this.action.pipe(
      // Get industries list request
      ofType(IndustriesApiActions.getIndustriesListRequest),
      exhaustMap(() =>
        this.industryService.getIndustries().pipe(
          // Success
          map(response => IndustriesApiActions.getIndustriesListSuccess({ industries: response as Industry[] })),
          // Error
          catchError((error: any) => of(IndustriesApiActions.getIndustriesListError({ error })))
        )
      )
    )
  )
}