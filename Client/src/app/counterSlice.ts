import {createSlice} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: "Not Logged in!"
    },
    reducers:{
        increment: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const testConst = 1;
export const {increment} = counterSlice.actions
export default counterSlice.reducer

