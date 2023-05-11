import './user.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Preloader from "../preloader/preloader";
import {setAuth} from "../../assets/js/redux/authRedux";

let AuthUser = (props) => {
    return (
        <div className={"header--user-auth flex flex-center-vertical"}>
            <button className={"header--register"} type={"button"}>Зарегистрироваться</button>
            <span></span>
            <Link onClick={() => {
                if (props.open) {
                    props.toggleMenu()
                }
            }} to={'/auth'} className={"header--enter"}>Войти</Link>
        </div>
    )
}

let HeaderCompany = (props) => {
    return (
        <div className={"header--company flex flex-column"}>
            {!props.user.loading ? <>
                    <div className={"flex flex-center-vertical flex-space-between"}>Использовано
                        компаний <span>{props.user.company.used}</span>
                    </div>
                    <div className={"flex flex-center-vertical flex-space-between"}>Лимит по
                        компаниям <span>{props.user.company.limit}</span>
                    </div>
                </>
                : <Preloader/>}
        </div>
    )
}


let RegisteredUser = (props) => {
    let user = props.user;
    const dispatch = useDispatch();
    let userLogOut = () => {
        dispatch(setAuth(false));
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire')
    }
    return (
        <div className={"header--register-wrap flex flex-space-between"}>
            <HeaderCompany user={user}/>
            <div className={"header--user-main flex flex-center-vertical"}>
                <div className={"header--user-left flex flex-column"}>
                    <div className={"header--user-name"}>Анна К.</div>
                    <button onClick={userLogOut} type={"button"} className={"header--user-exit"}>Выйти</button>
                </div>
                <div className={"header--user-image"}>
                    <img src={user.icon} alt={"user_avatar"}/>
                </div>
            </div>
        </div>
    )
}

let User = (props) => {
    const {user} = useSelector((state) => state.user);
    const {auth} = useSelector((state) => state.auth);
    return (
        <div className={"header--user flex flex-center-vertical flex-space-between"}>
            {auth ? <RegisteredUser user={user}/> : <AuthUser open={props.open} toggleMenu={props.toggleMenu}/>}
        </div>
    )
}


let MobileUser = () => {
    const {user} = useSelector((state) => state.user);
    return (
        <div className={"header--company-mobile"}>
            <HeaderCompany user={user}/>
        </div>
    )
}

export {User, MobileUser}