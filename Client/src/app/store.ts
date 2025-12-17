import { configureStore } from '@reduxjs/toolkit'
import reducer from "./loggedInNameSlice"

export const store = configureStore({
  reducer: {
    loggedInName: reducer
  }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type.
export type AppDispatch = AppStore['dispatch']