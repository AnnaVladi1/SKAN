import './authorization.css'
import AuthBg from '../../assets/img/auth_bg.svg'
import AuthForm from "../../components/auth_form/auth_form";

let Authorization = () => {
    return (
        <section id={"authorization"}>
            <div className={"container"}>
                <div className={"auth--wrap grid"}>
                    <div className={"auth--left"}>
                        <h1>Для оформления подписки
                            на тариф, необходимо авторизоваться.</h1>
                    </div>
                    <div className={"flex auth--left-bottom"}>
                        <img src={AuthBg} alt={'background'}/>
                    </div>
                    <AuthForm/>
                </div>
            </div>
        </section>
    )
}

export default Authorization