import './summary.css'
import {useDispatch, useSelector} from "react-redux";
import {useKeenSlider} from "keen-slider/react";
import {Arrow, num_word} from "../../../assets/js/helpers/functions";
import {setCurrent} from "../../../assets/js/redux/summaryRedux";
import Preloader from "../../preloader/preloader";

let SliderWrap = (props) => {
    let slides = props.slides;
    let dispatch = useDispatch();
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slides: {
                perView: "auto",
                spacing: 0,
            },
            mode: "free-snap",
            loop: false,
            centered: true,

            slideChanged(slider) {
                dispatch(setCurrent(slider.track.details.rel))
            },
            breakpoints: {
                '(max-width: 519px)': {
                    slides: {
                        perView: 1,
                    }
                },
            },
        },
        [
            // add plugins here
        ]
    )
    return (
        <>
            <Arrow
                left
                disabled={+props.current === 0}
                onClick={(e) => {
                    e.stopPropagation() || instanceRef.current?.prev()
                }
                }
            />

            <Arrow
                disabled={instanceRef.current?.track.details.maxIdx === +props.current}
                onClick={(e) => {
                    e.stopPropagation() || instanceRef.current?.next()
                }

                }
            />
            <div ref={sliderRef} className={"keen-slider summary--slider-main"}>
                {Object.keys(slides).map(key => {
                    return <div key={key} className={"summary--slider-block keen-slider__slide"}>
                        <ul className={"flex flex-column flex-space-between"}>
                            {Object.values(slides[key]).map(val => {
                                    return <li key={Math.random()}>{val}</li>
                                }
                            )}
                        </ul>
                    </div>
                })
                }
            </div>
        </>)
}
let Slider = (props) => {
    return (
        <div className={"summary--slider-wrap"}>

            <div className={"summary--slider-container"}>
                <div className={"summary--slider flex"}>
                    <div className={"summary--slider-left"}>
                        <ul className={"flex flex-column"}>
                            <li>Период</li>
                            <li>Всего</li>
                            <li>Риски</li>
                        </ul>
                    </div>
                    {!props.load ? <div className={"summary--slider-right flex"}>
                        <Preloader text={"Загружаем данные"}/>
                    </div> : <SliderWrap slides={props.results} current={props.current}/>}
                </div>
            </div>
        </div>
    )
}

let Summary = () => {
    const {
        results, load, currentSlide,
    } = useSelector((state) => state.summary);



    return (
        <section id={"summary"}>
            <div className={"container"}>
                <div className={"summary--wrap"}>
                    <div className={"title small"}>Общая сводка</div>
                    <div
                        className={"summary--total"}>Найдено {Object.keys(results).length} {num_word(Object.keys(results).length, ['вариант', 'варианта', 'вариантов'])}</div>
                </div>
                <Slider results={results} load={load} current={currentSlide}/>
            </div>
        </section>
    )
}

export default Summary