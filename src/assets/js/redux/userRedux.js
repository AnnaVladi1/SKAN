import {createSlice} from '@reduxjs/toolkit'
import User from '../../img/user.png'
export const user = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: 'Анна К.',
            icon: User,
            loading: true,
            company: {
                used: '',
                limit: ''
            }
        }

    },
    reducers: {
        setCompany: (state, action) => {
            state.user.company.used = action.payload.eventFiltersInfo.usedCompanyCount;
            state.user.company.limit = action.payload.eventFiltersInfo.companyLimit;
            state.user.loading = false;
        },
    },
})


export const {setCompany} = user.actions

export default user.reducer