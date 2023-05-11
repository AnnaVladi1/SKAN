import {createSlice} from '@reduxjs/toolkit'

export const formHolder = createSlice({
    name: 'formHolder',
    initialState: {
        login: '',
        password: '',
        valid: false
    },
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        handleValid: (state,action) => {
            state.valid = action.payload;
        }
    },
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const {setLogin, setPassword, handleValid} = formHolder.actions

export default formHolder.reducer