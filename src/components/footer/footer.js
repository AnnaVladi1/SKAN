import './footer.css'
import logo from '../../assets/img/footer_logo.png'

let Footer = () => {
    let date = new Date().getFullYear();
    return (
        <footer>
            <div className={"container"}>
                <div className={"footer--wrap flex flex-space-between"}>
                    <div className={"footer--logo flex"}>
                        <img src={logo} alt={"footer_logo"}/>
                    </div>
                    <div className={"footer--contacts flex flex-column"}>
                        <div>г. Москва, Цветной б-р, 40</div>
                        <a href={"tel:+7 495 771 21 11"}>+7 495 771 21 11</a>
                        <a href={"mailto:info@skan.ru"}>info@skan.ru</a>
                        <div className={"footer--copy"}>
                            Copyright. {date}
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;