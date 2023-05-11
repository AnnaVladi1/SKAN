import './index_middle.css';
import 'keen-slider/keen-slider.min.css'
import icon_1 from '../../../assets/img/icon_1.svg'
import icon_2 from '../../../assets/img/icon_2.svg'
import icon_3 from '../../../assets/img/icon_3.svg'
import {useKeenSlider} from 'keen-slider/react'
import { useDispatch } from 'react-redux'
import { setCurrent } from '../../../assets/js/redux/keenRedux'
import {Arrow} from "../../../assets/js/helpers/functions";

let Slider = () => {
    const AdaptiveHeight = (slider) => {
        function updateHeight() {
            slider.container.style.height =
                slider.slides[slider.track.details.rel].offsetHeight + "px"
        }
        slider.on("created", () => { setTimeout( () => {
            if(slider.options.slides.perView === 1) {
                updateHeight()
            } else {
                slider.container.style.height = 'auto'
            }
        }, 50)});
        slider.on("slideChanged", updateHeight)
        slider.on("detailsChanged", (slider) => {
            if(slider.options.slides.perView === 1) {
                updateHeight()
            } else {
                slider.container.style.height = 'auto'
            }
        })
    }
    const dispatch = useDispatch()
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slides: {
                perView: 3,
                spacing: 0,
            },
            loop: true,
            centered: true,
            breakpoints: {
                '(max-width: 1119px)': {
                    slides: {
                        perView: 2,
                    }
                },
                '(max-width: 767px)': {
                    slides: {
                        perView: 1,
                    }
                },
            },

            slideChanged(slider) {
                dispatch(setCurrent(slider.track.details.rel))
            },
        },
        [AdaptiveHeight]
    )

    return (
        <>
            <Arrow
                left
                onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                }
            />

            <Arrow
                onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                }
            />
            <div ref={sliderRef} className="keen-slider keen-slider-middle">
                <div className="keen-slider__slide middle--slide">
                    <div>
                        <div>
                            <div className={"keen--icon"}>
                                <img src={icon_1} alt={'icon'}/>
                            </div>
                            <span>Высокая и оперативная скорость обработки заявки</span>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide middle--slide">
                    <div>
                        <div>
                            <div className={"keen--icon"}>
                                <img src={icon_2} alt={'icon'}/>
                            </div>
                            <span>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</span>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide middle--slide">
                    <div>
                        <div>
                            <div className={"keen--icon"}>
                                <img src={icon_3} alt={'icon'}/>
                            </div>
                            <span>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</span>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide middle--slide">
                    <div>
                        <div>
                            <div className={"keen--icon"}>
                                <img src={icon_1} alt={'icon'}/>
                            </div>
                            <span>Высокая и оперативная скорость обработки заявки</span>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide middle--slide">
                    <div>
                        <div>
                            <div className={"keen--icon"}>
                                <img src={icon_2} alt={'icon'}/>
                            </div>
                            <span>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</span>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide middle--slide">
                    <div>
                        <div>
                            <div className={"keen--icon"}>
                                <img src={icon_3} alt={'icon'}/>
                            </div>
                            <span>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

let IndexMiddle = () => {
    return (
        <section id={"middle"}>
            <div className={"middle--wrap"}>
                <div className={"title"}>
                    Почему именно мы
                </div>
                <div className={"middle--slider"}>
                    <Slider/>
                </div>
            </div>
        </section>
    )
}

export default IndexMiddle;