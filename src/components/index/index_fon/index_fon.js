import './index_fon.css'
import fon_1 from '../../../assets/img/fon_1.svg'
import fon_2 from '../../../assets/img/fon_2.svg'

let IndexFon = () => {
    return (
        <section id={"fon"}>
            <div className={"index--fon grid flex-start"}>
                <div className={"index--fon-left"}>
                    <img src={fon_1} alt={"fon"}/>
                </div>
                <div className={"index--fon-right"}>
                    <img src={fon_2} alt={"fon"}/>
                </div>
            </div>
        </section>
    )
}

export default IndexFon;