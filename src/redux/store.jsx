import { configureStore } from "@reduxjs/toolkit";
import groceryReducer from "./slice"

export const store = configureStore({
    reducer: {
        grocery: groceryReducer
    }
})