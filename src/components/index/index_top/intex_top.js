import './index_top.css'
import Top from '../../../assets/img/top.png';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

let IndexTop = () => {
    const {auth} = useSelector((state) => state.auth);
    return (
        <section id={"top"}>
            <div className={"top--wrap flex"}>
                <div className={"top--left"}>
                    <h1>сервис по поиску публикаций о компании по его ИНН</h1>
                    <span>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</span>
                    {auth ?  <Link className={"inline-flex"} to={!auth ? '/auth' : '/search'}>Запросить данные</Link> : ''}

                </div>
                <div className={"top--right"}>
                    <img src={Top} alt={"top_image"}/>
                </div>
            </div>
        </section>
    )
}

export default IndexTop;