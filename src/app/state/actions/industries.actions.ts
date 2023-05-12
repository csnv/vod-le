import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Industry } from 'src/app/industry/industry.model';

export const IndustriesApiActions = createActionGroup({
  source: 'Industries API',
  events: {
    'Get Industries List Request': emptyProps(),
    'Get Industries List Success': props<{ industries: Industry[] }>(),
    'Get Industries List Error': props<{ error: any }>(),
  }
})