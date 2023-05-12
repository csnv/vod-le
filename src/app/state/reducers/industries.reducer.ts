import { createReducer, on } from "@ngrx/store";
import { Industry } from "src/app/industry/industry.model";
import { IndustriesApiActions } from "../actions/industries.actions";

export interface IndustryState {
  loading: boolean,
  loaded: boolean,
  list: Industry[]
}
export const initialState: IndustryState = {
  loading: false,
  loaded: false,
  list: []
};

export const industriesReducer = createReducer(
  initialState,

  on(
    IndustriesApiActions.getIndustriesListSuccess,
    (state, { industries }) => ({
      loaded: true,
      loading: false,
      list: industries
    })
  )
);