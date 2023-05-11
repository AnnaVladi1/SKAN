import { createSlice } from '@reduxjs/toolkit'

export const keenState = createSlice({
    name: 'keenSlider',
    initialState: {
        value: 0,
    },
    reducers: {
        setCurrent: (state, action) => {
            state.value = action.payload;
        },
    },
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setCurrent } = keenState.actions

export default keenState.reducer