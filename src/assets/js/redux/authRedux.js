import {createSlice} from '@reduxjs/toolkit'

export const authHolder = createSlice({
    name: 'authHolder',
    initialState: {
        auth: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
    },
})


export const {setAuth} = authHolder.actions

export default authHolder.reducer