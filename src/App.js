import './assets/css/main.css'
import Header from "./components/header/header";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Index from "./pages/index";
import Footer from "./components/footer/footer";
import Authorization from "./pages/authorization/authorization";
import {setAuth} from './assets/js/redux/authRedux'
import {useEffect, useImperativeHandle} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "./assets/js/helpers/requests";
import {setActive} from './assets/js/redux/tarifsRedux'
import {setCompany} from './assets/js/redux/userRedux'
import {mainRef} from "./assets/js/helpers/refs";
import SearchPage from "./pages/search/search";
import SearchResults from "./pages/search_results/searchResults";


function App() {
    const {auth} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!auth) {
            mainRef.current.checkAuth();
        }
    }, [])

    useImperativeHandle(mainRef, () => ({
        checkAuth: () => {
            let date = localStorage.getItem('expire');
            if (!date) {
                setAuth(false);
                return false;
            } else {
                let expire = new Date(date),
                    currentDate = new Date(),
                    valid = expire > currentDate;
                dispatch(setAuth(valid));
                if(valid) {
                    getUserInfo().then(e => {
                        dispatch(setCompany(e));
                        dispatch(setActive(0));
                    })
                }

                return true;
            }
        },
    }));
    return (
        <BrowserRouter>
            <div ref={mainRef} className="App">
                <Header/>
                <main>
                    <Routes>
                        <Route index element={<Index/>}/>
                        <Route path={'/auth'} element={<Authorization/>}/>
                        {auth ? <Route path={'/search'} element={<SearchPage/>}/> : ''}
                        {auth ? <Route path={'/results'} element={<SearchResults/>}/> : ''}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
