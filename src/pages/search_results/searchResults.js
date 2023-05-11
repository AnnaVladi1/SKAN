import './searchResults.css';
import SearchProcess from '../../assets/img/search_process.svg'
import Summary from "../../components/search_page/summary/summary";
import Documents from "../../components/search_page/documents/documents";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

let Top = () => {
    return (<div className={"results--top flex flex-start flex-space-between"}>
        <div className={"results--top-left"}>
            <h1>Ищем. Скоро будут результаты</h1>
            <div>Поиск может занять некоторое время,<br/> просим сохранять терпение.</div>
        </div>
        <div className={"results--top-right"}>
            <img src={SearchProcess} alt={"search_process"}/>
        </div>
    </div>)
}

let SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        load
    } = useSelector((state) => state.summary);
    useEffect(() => {
        return () => {
            if (!location.state) {
                navigate('/');
            }
        };
    }, [location]);

    return (
        <>
            <section id={"results"}>
                <div className={"container"}>
                    <div className={"results--wrap"}>
                        {!load ? <Top/> : ''}
                    </div>
                </div>
            </section>
            <Summary/>
            <Documents/>
        </>
    )
}

export default SearchResults;