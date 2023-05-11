import { configureStore } from '@reduxjs/toolkit'
import keenState from './redux/keenRedux'
import formHolder from "./redux/formRedux";
import authHolder from "./redux/authRedux";
import tariffs from "./redux/tarifsRedux";
import user from "./redux/userRedux";
import search from "./redux/searchRedux";
import summary from "./redux/summaryRedux";

export default configureStore({
    reducer: {
        keen: keenState,
        form: formHolder,
        auth: authHolder,
        tariffs: tariffs,
        user: user,
        search: search,
        summary: summary,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: [search],
                ignoreState: [search],
                ignoredActions: ['search/setStartDate','search/setEndDate']
            },
        }),
})