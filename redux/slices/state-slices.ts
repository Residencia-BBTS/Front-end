import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IStates } from "../../app/lib/global-state-interface";

const initialState: IStates = {
  isNavOpen: false,
}

const stateSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      set_isNavOpen: (state, action: PayloadAction<boolean>) => {
        state.isNavOpen = action.payload
      }
    }
})

export const { 
  set_isNavOpen
} = stateSlice.actions;
export default stateSlice.reducer;