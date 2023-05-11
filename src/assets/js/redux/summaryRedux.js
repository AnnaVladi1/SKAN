import { createSlice } from '@reduxjs/toolkit'

export const summary = createSlice({
    name: 'summary',
    initialState: {
        documentsLoad: false,
        index: 0,
        documents: [],
        currentSlide: 0,
        objectSearch: {},
        results: {},
        load: false,
    },
    reducers: {
        clearDocuments: (state) => {
            state.documents = [];
            state.index = 0;
            state.objectSearch = {};
            state.results = {};
            state.load = false;
            state.documentsLoad = true;
        },
        setDocuments: (state,action) => {
          state.documents.push(action.payload);
          state.index = ++state.index;
          state.documentsLoad = true;
        },
        setResults: (state, action) => {
            state.results = action.payload.results;
            state.load = true;
            state.objectSearch = action.payload.objectSearch;
        },
        setCurrent: (state, action) => {
            state.currentSlide = action.payload;
        },
    },
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setResults, setCurrent ,setDocuments,clearDocuments} = summary.actions

export default summary.reducer