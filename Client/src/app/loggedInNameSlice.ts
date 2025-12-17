import {createSlice} from '@reduxjs/toolkit'

export const loggedInNameSlice = createSlice({
    name: "loggedInName",
    initialState: {
        name: "Not Logged in!"
    },
    reducers:{
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const {setName} = loggedInNameSlice.actions
export default loggedInNameSlice.reducer

