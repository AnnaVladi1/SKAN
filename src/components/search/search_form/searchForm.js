import './searchForm.css'
import {
    setMask,
    setActiveTonality,
    setDocumentsQuantity,
    setStartDate,
    setEndDate,
    toggleCheckbox,
    setInn,
    setErrors,
    toggleButton,
} from "../../../assets/js/redux/searchRedux";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import {useDispatch, useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import {Error, spliceIntoChunks} from "../../../assets/js/helpers/functions";
import {useNavigate} from "react-router-dom";
import {getHistograms, getObjects} from "../../../assets/js/helpers/requests";
import {clearDocuments, setResults} from "../../../assets/js/redux/summaryRedux";

registerLocale('ru', ru)


function validateInn(inn) {
    let error = {};
    var result = true;
    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        inn = '';
    }
    if (!inn.length) {
        error.code = 1;
        error.message = 'ИНН пуст';
    } else if (/[^0-9]/.test(inn)) {
        error.code = 2;
        error.message = 'ИНН может состоять только из цифр';
    } else if ([10, 12].indexOf(inn.length) === -1) {
        error.code = 3;
        error.message = 'ИНН может состоять только из 10 или 12 цифр';
    } else {
        var checkDigit = function (inn, coefficients) {
            var n = 0;
            for (var i in coefficients) {
                n += coefficients[i] * inn[i];
            }
            return parseInt(n % 11 % 10);
        };
        switch (inn.length) {
            case 10:
                var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === parseInt(inn[9])) {
                    result = false;
                }
                break;
            case 12:
                var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                    result = false;
                }
                break;
            default:
                return true;
        }
        if (!result) {
            error.code = 4;
            error.message = 'Неправильное контрольное число';
        }
    }
    return result;
}


let Checkbox = (props) => {
    return (
        <div onClick={props.callback}
             className={`checkbox--wrap flex flex-center-vertical ${props.checked ? 'active' : ''}`}>
            <div></div>
            <div>{props.name}</div>
        </div>
    )
}

let FormSelect = (props) => {
    const dispatch = useDispatch();
    const tonalityRef = createRef();
    let [active, setActive] = useState(false);
    let selectItem = (value) => {
        dispatch(setActiveTonality(value))
        setActive(!active);
        tonalityRef.current.value = value;
    }

    let outerClick = (e) => {
        let select = document.querySelector('.select--wrap')
        if (!e.target.classList.contains('select--wrap') && !select.contains(e.target)) {
            setActive(false)
        }
    }


    useEffect(() => {
        document.addEventListener('click', outerClick);
        return () => {
            document.removeEventListener('click', outerClick);
        };
    })
    return (
        <>
            <label htmlFor={props.id}>{props.name}</label>
            <div className={"select--wrap"}>
                <div onClick={() => {
                    setActive(!active);
                }
                } className={`select--holder ${active ? 'active' : ''}`}>{props.data[props.current].name}</div>
                {active ?
                    <div className={"select--main"}>
                        <ul>
                            {Object.keys(props.data).map(key => {
                                let activeElement = props.data[key].active;
                                return <li key={key}>
                                    <button onClick={() => {
                                        selectItem(props.data[key].value)
                                    }
                                    } className={`${activeElement ? 'active' : ''}`}
                                            type={"button"}>{props.data[key].name}</button>
                                </li>
                            })}
                        </ul>
                    </div> : ''}
            </div>
            <input ref={tonalityRef} id={props.id} type={"hidden"} name={props.id}/>
        </>
    )
}

let SearchForm = () => {
    const {
        bigMask,
        tonality,
        documentsTotal,
        dates,
        checkbox,
        histogramTypes,
        intervalType,
        sortDirectionType,
        sortType,
        similarMode,
        inn,
        errors,
        buttonEnable
    } = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let validateForm = () => {

        let ans = validateInn(inn),
            total = documentsTotal.length > 0 && +documentsTotal > 0 && +documentsTotal <= 1000;
        dispatch(setErrors({
            inn: ans,
            total: !total,
        }))
        if (ans || !total) {
            return false;
        }
        let obj = {
            "issueDateInterval": {
                "startDate": dates.endDate,
                "endDate": dates.startDate,
            },
            "searchContext": {
                "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                        {
                            "type": "company",
                            "sparkId": null,
                            "entityId": null,
                            "inn": inn,
                            "maxFullness": checkbox['maxFullness'].checked,
                            "inBusinessNews": checkbox['inBusinessNews'].checked,
                        }
                    ],
                    "onlyMainRole": checkbox['onlyMainRole'].checked,
                    "tonality": Object.values(tonality.items).filter(el => {
                        return el.active;
                    })[0].value,
                    "onlyWithRiskFactors": checkbox['onlyWithRiskFactors'].checked,
                    "riskFactors": {
                        "and": [],
                        "or": [],
                        "not": []
                    },
                    "themes": {
                        "and": [],
                        "or": [],
                        "not": []
                    }
                },
                "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "searchArea": {
                "includedSources": [],
                "excludedSources": [],
                "includedSourceGroups": [],
                "excludedSourceGroups": []
            },
            "attributeFilters": {
                "excludeTechNews": checkbox['excludeTechNews'].checked,
                "excludeAnnouncements": checkbox['excludeAnnouncements'].checked,
                "excludeDigests": checkbox['excludeDigests'].checked
            },
            "similarMode": similarMode,
            "limit": documentsTotal,
            "sortType": sortType,
            "sortDirectionType": sortDirectionType,
            "intervalType": intervalType,
            "histogramTypes": histogramTypes
        }
        dispatch(clearDocuments())
        getHistograms(obj).then(e => {
            let result = {}
            if (e.data.length) {
                // eslint-disable-next-line array-callback-return
                e.data.map(item => {
                    // eslint-disable-next-line array-callback-return
                    item.data.map((el, index) => {
                        if (result[index]) {
                            result[index][item.histogramType] = el.value;
                        } else {
                            result[index] = {
                                date: new Date(el.date).toLocaleDateString('ru-Ru'),
                                [item.histogramType]: el.value
                            };
                        }
                    })
                })
            }
            getObjects(obj).then(objects => {
                let array = objects.items.map(el => {
                    return el.encodedId;
                })
                let items = spliceIntoChunks(array, 10);
                dispatch(setResults({
                    results: result,
                    objectSearch: items,
                }));
            })

        })


        navigate("/results", {state: {pageLoad: true}});

    }

    function totalAction(e) {
        dispatch(setDocumentsQuantity(e.target.value > 1000 ? 1000 : e.target.value))
        dispatch(toggleButton(e.target.value.length > 0 && inn.length > 0))
        dispatch(setErrors({
            total: false,
        }))
    }

    let checkMask = (value, key) => {
        let val = value.replace(/[^+\d]/g, '');
        let isNumber = parseInt(key) >= 0;
        if (val.length === 10 && isNumber && !bigMask) {
            dispatch(setMask(true))
        }
        if (val.length === 10 && bigMask) {
            dispatch(setMask(false))
        }
        dispatch(setInn(val))
    }
    let mask = bigMask ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/] : [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
    return (
        <div className={"search--form-wrap"}>
            <form id={"search"}>
                <div className={"search--form-main flex"}>
                    <div className={"search--form-left"}>
                        <div className={`search--form-block flex flex-start flex-column ${errors.inn ? 'error' : ''}`}>
                            <label htmlFor={"form_inn"}>ИНН компании<sup>*</sup></label>
                            <div className={"input--wrap"}>
                                <MaskedInput
                                    mask={mask}
                                    defaultValue={inn}
                                    value={inn}
                                    placeholder={'10 цифр или 12 цифр'}
                                    onChange={(e) => {
                                        checkMask(e.target.value, e.nativeEvent.data);
                                        dispatch(toggleButton(e.target.value.length > 0 && documentsTotal.length > 0))
                                        dispatch(setErrors({
                                            inn: false,
                                        }))
                                    }}
                                    id={"form_inn"}
                                    type={"tel"}
                                    autoFocus
                                    name={"form_inn"}
                                    className={"input"}
                                />
                                {errors.inn ? <Error text={"Введите корректные данные"}/> : ''}
                            </div>
                        </div>
                        <div className={"search--form-block flex flex-column"}>
                            <FormSelect id={"form_tonality"} name={tonality.name} current={tonality.activeElement}
                                        data={tonality.items}/>
                        </div>
                        <div
                            className={`search--form-block flex-start flex flex-column ${errors.total ? 'error' : ''}`}>
                            <label htmlFor={"form_documents"}>Количество документов в выдаче<sup>*</sup></label>
                            <div className={"input--wrap"}>
                                <MaskedInput
                                    mask={[/\d/, /\d/, /\d/, /\d/]}
                                    defaultValue={documentsTotal}
                                    value={documentsTotal}
                                    placeholder={'От 1 до 1000'}
                                    onChange={(e) => {
                                        totalAction(e)
                                    }}
                                    id={"form_documents"}
                                    type={"tel"}
                                    showMask={false}
                                    placeholderChar={' '}
                                    autoFocus
                                    name={"form_documents"}
                                    className={"input"}
                                />
                                {errors.total ? <Error text={"Обязательное поле"}/> : ''}
                            </div>
                        </div>
                        <div className={"search--form-block flex flex-column"}>
                            <label htmlFor={"form_date_start"}>Диапазон поиска<sup>*</sup></label>
                            <div className={"date--wrap flex flex-center-vertical"}>
                                <div className={"date--main"}>
                                    <DatePicker dateFormat="dd.MM.yyyy" locale="ru" className={"input date--input"}
                                                id={"form_date_start"} name={"date_start"}
                                                maxDate={new Date()}
                                                selected={dates.startDate}
                                                onChange={(date) => dispatch(setStartDate(date))}/>
                                </div>
                                <div className={"date--main"}>
                                    <DatePicker maxDate={dates.maxDate} dateFormat="dd.MM.yyyy" locale="ru"
                                                className={"input date--input"}
                                                id={"form_date_end"} name={"date_end"}
                                                selected={dates.endDate}
                                                onChange={(date) => dispatch(setEndDate(date))}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"search--form-right"}>
                        {Object.keys(checkbox).map(key => {
                            return <Checkbox callback={() => {
                                dispatch(toggleCheckbox(key))
                            }} key={key}
                                             name={checkbox[key].name} checked={checkbox[key].checked}/>
                        })
                        }
                    </div>
                    <div className={"search--form-button"}>
                        <button disabled={buttonEnable} onClick={validateForm} type={"button"}>Поиск</button>
                        <div>* Обязательные к заполнению поля</div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchForm