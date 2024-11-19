import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IStates } from "../../app/lib/global-state-interface";

const end = new Date().toISOString()
const start = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()

const initialState: IStates = {
  isNavOpen: false,
  isAboutModal: false,
  ticketData: null,
  userList: null,
  dayRangeFilter: {
    from: start,
    to: end
  }
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
      set_userList: (state, action: PayloadAction<User[]>) => {
        state.userList = action.payload
      },
      set_dayRangeFilter: (state, action: PayloadAction<DateRange>) => {
        state.dayRangeFilter = {
          from: action.payload.from ? new Date(action.payload.from).toISOString() : null,
          to: action.payload.to ? new Date(action.payload.to).toISOString() : null,
        };
      },
    }
})  

export const { 
  set_isNavOpen,
  set_isAboutModal,
  set_ticketData,
  set_userList,
  set_dayRangeFilter
} = stateSlice.actions;
export default stateSlice.reducer;