import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IStates } from "../../app/lib/global-state-interface";

const initialState: IStates = {
  isNavOpen: false,
  isAboutModal: false,
  ticketData: null,
  dayAmountFilter: 7
}

const stateSlice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
      set_isNavOpen: (state, action: PayloadAction<boolean>) => {
        state.isNavOpen = action.payload
      },
      set_isAboutModal: (state, action: PayloadAction<boolean>) => {
        state.isAboutModal = action.payload
      },
      set_ticketData: (state, action: PayloadAction<Incident[]>) => {
        state.ticketData = action.payload
      },
      set_dayAmountFilter: (state, action: PayloadAction<number>) => {
        state.dayAmountFilter = action.payload
      }
    }
})  

export const { 
  set_isNavOpen,
  set_isAboutModal,
  set_ticketData,
  set_dayAmountFilter
} = stateSlice.actions;
export default stateSlice.reducer;