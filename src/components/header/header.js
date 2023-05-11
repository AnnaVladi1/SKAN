import logo from '../../assets/img/logo.png'
import './header.css'
import  {MobileUser,User} from "../user/user";
import {useState} from "react";
import {useSelector} from "react-redux";

let Menu = () => {
    return (
        <div className={"header--menu"}>
            <nav>
                <ul className={"flex flex-center-vertical"}>
                    <li>
                        <a href={"/"}>Гланая</a>
                    </li>
                    <li>
                        <a href={"/"}>Тарифы</a>
                    </li>
                    <li>
                        <a href={"/"}>FAQ</a>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

let MenuButton = (props) => {
    return(<button onClick={props.toggleMenu} className={"header--mobile-menu"} type={"button"}>
        <span></span>
        <span></span>
        <span></span>
    </button>)
}
let Header = () => {
    const [open, setOpen] = useState(false);
    const {auth} = useSelector((state) => state.auth);
    let toggleMenu = () => {
        setOpen(!open);
    }
    return (
        <header className="header">
            <div className={"container"}>
                <div className={"header--main flex flex-center-vertical"}>
                    <div className={'header--logo flex'}>
                        <a className={'flex'} href={"/"}>
                            <img src={logo} alt={"logo"}/>
                        </a>
                    </div>
                    {auth ? <MobileUser/> : ''}
                    <div className={`header--main-wrap flex flex-center-vertical ${open ? 'active' : ''}`}>
                        <Menu/>
                        <User open={open} toggleMenu={toggleMenu.bind(this)}/>
                    </div>
                    <MenuButton toggleMenu={toggleMenu.bind(this)}/>
                </div>
            </div>
        </header>
    )
}

export default Header