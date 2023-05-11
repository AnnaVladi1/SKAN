import {createSlice} from '@reduxjs/toolkit'

let date = new Date();
export const search = createSlice({
    name: 'search',
    initialState: {
        bigMask: false,
        documentsTotal: '',
        buttonEnable: true,
        inn: '',
        sortType: 'issueDate',
        sortDirectionType: 'desc',
        intervalType: 'month',
        histogramTypes: ['totalDocuments','riskFactors'],
        similarMode: 'duplicates',
        errors: {
            inn: false,
            total: false
        },
        dates: {
            startDate: date,
            endDate: date,
            maxDate: date,
        },
        tonality: {
            activeElement: 0,
            name: 'Тональность',
            items: {
                0: {
                    name: 'Любая',
                    value: 'any',
                    active: true,
                },
                1: {
                    name: 'Любая2',
                    value: 'any',
                    active: false,
                },
                2: {
                    name: 'Любая3',
                    value: 'any',
                    active: false,
                }
            }
        },
        checkbox: {
            maxFullness: {
                name: 'Признак максимальной полноты',
                checked: false,
            },
            inBusinessNews: {
                name: 'Упоминания в бизнес-контексте',
                checked: false,
            },
            onlyMainRole : {
                name: 'Главная роль в публикации',
                checked: false,
            },
            onlyWithRiskFactors: {
                name: 'Публикации только с риск-факторами',
                checked: false,
            },
            excludeTechNews: {
                name: 'Включать технические новости рынков',
                checked: false,
            },
            excludeAnnouncements: {
                name: 'Включать анонсы и календари',
                checked: false,
            },
            excludeDigests: {
                name: 'Включать сводки новостей',
                checked: false,
            },
        }
    },
    reducers: {
        setMask: (state, action) => {
            state.bigMask = action.payload;
        },
        setInn: (state, action) => {
            state.inn = action.payload;
        },
        setDocumentsQuantity: (state, action) => {
            state.documentsTotal = action.payload;
        },
        setStartDate: (state, action) => {
            state.dates.startDate = action.payload;
            let date = new Date(action.payload);
            state.dates.maxDate = date;
            if (state.dates.endDate > date) {
                state.dates.endDate = date;
            }
        },
        setEndDate: (state, action) => {
            state.dates.endDate = action.payload;
        },
        setActiveTonality: (state, action) => {
            Object.keys(state.tonality.items).map(key => {
                let current = state.tonality.items[key].value === action.payload;
                if (current) {
                    state.tonality.activeElement = key;
                }
                state.tonality.items[key].active = current;
                return true;
            })
        },
        toggleCheckbox: (state, action) => {
            state.checkbox[action.payload].checked = !state.checkbox[action.payload].checked;
        },
        toggleButton: (state, action) => {
            state.buttonEnable = !action.payload;
        },
        setErrors: (state, action) => {
            Object.keys(action.payload).map(key => {
                state.errors[key] = action.payload[key];
                return true
            })
        },
    },
})




export const {
    setMask,
    setActiveTonality,
    setDocumentsQuantity,
    setStartDate,
    setEndDate,
    toggleCheckbox,
    setInn,
    setErrors,
    toggleButton
} = search.actions

export default search.reducer