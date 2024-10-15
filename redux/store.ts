import { configureStore } from "@reduxjs/toolkit";
import stateSlices from "./slices/state-slices";

export const store = configureStore({
    reducer: {
        states: stateSlices
    }
})