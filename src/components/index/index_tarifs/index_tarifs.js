import './index_tarifs.css'
import {useSelector} from 'react-redux'


let TariffsBlock = (props) => {
    let tariff = props.tariff;
    return (
        <div className={`tariffs--block flex flex-column ${tariff.class}`}>
            <div className={"tariffs--top"}>
                <div className={"tariffs--title"}>{tariff.title}</div>
                <div className={"tariffs--description"}>{tariff.description}</div>
                <img src={tariff.icon} alt={"tariffs_logo"}/>
            </div>
            <div className={"tariffs--middle flex flex-column"}>
                {tariff.selected ? <div className={"tariffs--current inline-flex"}>Текущий тариф</div> : ''}
                <div className={"tariffs--prices"}>
                    <div className={"flex flex-center-vertical"}>
                        <div className={"tariffs--prices-new"}>{tariff.prices.current}</div>
                        <div className={"tariffs--prices-old"}>{tariff.prices.old}</div>
                    </div>
                    {tariff.prices.priceTariff.length ?
                        <div className={"tariffs--prices-description"}>или {tariff.prices.priceTariff} ₽/мес. при
                            рассрочке на 24
                            мес.</div> : ''}

                </div>
                <div className={"tariffs--bottom"}>
                    <div className={"tariffs--enter"}>
                        <div>В тариф входит:</div>
                        <ul>
                            {tariff.include.map(el => {
                                return <li key={el}>{el}</li>
                            })
                            }
                        </ul>
                    </div>
                    {tariff.selected ?
                        <button className={"tariffs--button lk"} type={"button"}>Перейти в личный кабинет</button> :
                        <button className={"tariffs--button about"} type={"button"}>Подробнее</button>}
                </div>
            </div>
        </div>
    )
}
let IndexTariffs = () => {
    const {blocks} = useSelector((state) => state.tariffs);
    return (
        <section id={"tariffs"}>
            <div className={"tariffs--wrap"}>
                <div className={"title"}>наши тарифы</div>
                <div className={"tariffs--main flex"}>
                    {Object.keys(blocks).map(el => {
                        return <TariffsBlock key={el} tariff={blocks[el]}/>
                    })}
                </div>
            </div>
        </section>
    )
}

export default IndexTariffs