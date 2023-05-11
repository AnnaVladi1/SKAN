import './search.css'
import Icon from '../../assets/img/document.svg'
import Icon2 from '../../assets/img/search_1.svg'
import Icon3 from '../../assets/img/search_2.svg'
import SearchForm from "../../components/search/search_form/searchForm";

let SearchPage = () => {
    return (
        <section id={"search"}>
            <div className={"container"}>
                <div className={"search--wrap flex"}>
                    <div className={"search--left"}>
                        <div className={"search--top"}>
                            <h1>Найдите необходимые данные в пару кликов.</h1>
                            <p>Задайте параметры поиска.<br/>
                                Чем больше заполните, тем точнее поиск</p>
                            <div>
                                <img src={Icon} alt={"document"}/>
                            </div>
                        </div>
                        <SearchForm/>
                    </div>
                    <div className={"search--right"}>
                        <div className={"flex"}>
                            <img src={Icon3} alt={"icon"}/>
                        </div>
                        <div className={"flex"}>
                            <img src={Icon2} alt={"icon"}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchPage;