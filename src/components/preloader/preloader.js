import './preloader.css'
import preloader from '../../assets/img/preloader.gif'

let Preloader = (props) => {
    return (
        <div className={"preloader flex flex-center-vertical flex-center-horizontal flex-column"}>
            <img src={preloader} alt={"preloader"}/>
            {props.text ? <div>{props.text}</div> : ''}
        </div>
    )
}

export default Preloader;