import './auth_form.css';
import formLock from '../../assets/img/auth_lock.svg'
import enter_1 from '../../assets/img/enter_1.svg'
import enter_2 from '../../assets/img/enter_2.svg'
import enter_3 from '../../assets/img/enter_3.svg'

import {useSelector, useDispatch} from 'react-redux'
import {setLogin, setPassword, handleValid} from '../../assets/js/redux/formRedux'
import {useEffect, useState} from "react";
import {auth} from "../../assets/js/helpers/requests";
import {useNavigate} from "react-router-dom";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import {Error} from "../../assets/js/helpers/functions";

let initAuth = async (login, password, navigate) => {
    return await auth({
        method: 'post',
        url: '/api/v1/account/login',
        data: {
            login: login,
            password: password
        }
    }).then(() => {
        navigate("/");
    }).catch(() => {
        return false;
    })
}
let AuthForm = () => {
    const {login, password, valid} = useSelector((state) => state.form);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [error,setError] = useState(false);

    useEffect(() => {
        dispatch(handleValid(login.length > 4 && password.length > 4))
    }, [login, password, dispatch])
    return (
        <div className={"form--wrap"}>
            <div className={"form--lock flex"}>
                <img src={formLock} alt={"lock"}/>
            </div>
            <div className={"form--main"}>
                <ul className={"form--tabs flex flex-space-between"}>
                    <li>
                        <button className={"active"} type={"button"}>Войти</button>
                    </li>
                    <li>
                        <button type={"button"}>Зарегистрироваться</button>
                    </li>
                </ul>
                <form id={"auth"} className={"flex flex-column"}>
                    <div className={"form--inputs flex flex-column"}>
                        <div className={`form--input flex flex-column ${error ? 'error' : ''}`}>
                            <label htmlFor={"form_phone"}>Логин или номер телефона:</label>
                            {login.length && login[0] === "+" ?
                                <MaskedInput
                                    mask={[/[+]/, /[1-9]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                    defaultValue={login}
                                    onChange={(e) => {
                                        setError(false)
                                        dispatch(setLogin(e.target.value.replace(/[^+\d]/g, '')))
                                    }}
                                    id={"form_phone"}
                                    type={"tel"}
                                    autoFocus
                                    name={"form_phone"}
                                    className={"input"}
                                >
                                </MaskedInput> : <input
                                    defaultValue={login}
                                    onChange={(e) => {
                                        setError(false)
                                        dispatch(setLogin(e.target.value))
                                    }}
                                    id={"form_phone"}
                                    autoFocus
                                    type={"tel"}
                                    name={"form_phone"}
                                    className={"input"}
                                >
                                </input>
                            }
                            {error ? <Error text={"Введите корректные данные"}/> : ''}
                        </div>
                        <div className={`form--input flex flex-column ${error ? 'error' : ''}`}>
                            <label htmlFor={"form_password"}>Пароль:</label>
                            <input onChange={(e) => {
                                setError(false)
                                dispatch(setPassword(e.target.value))
                            }} value={password} id={"form_password"} type={"password"} name={"form_password"}
                                   className={"input"}/>
                            {error ? <Error text={"Неправильный пароль"}/> : ''}
                        </div>
                    </div>
                    {error}
                    <button onClick={() => {
                        initAuth(login, password, navigate).then(() => {
                            setError(true)
                        })
                    }} disabled={!valid} className={"form--enter flex"} type={"button"}>Войти
                    </button>
                    <button type={'button'} className={"form--restore inline-flex"}>Восстановить пароль</button>
                    <div className={"form--methods"}>
                        <div>Войти через:</div>
                        <div className={"form--methods-main flex"}>
                            <button className={"flex flex-center-vertical flex-center-horizontal"} type={"button"}>
                                <img src={enter_1} alt={"enter"}/>
                            </button>
                            <button className={"flex flex-center-vertical flex-center-horizontal"} type={"button"}>
                                <img src={enter_2} alt={"enter"}/>
                            </button>
                            <button className={"flex flex-center-vertical flex-center-horizontal"} type={"button"}>
                                <img src={enter_3} alt={"enter"}/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthForm