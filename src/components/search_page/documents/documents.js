import './documents.css'
import {useDispatch, useSelector} from "react-redux";
import {getDocuments} from "../../../assets/js/helpers/requests";
import {setDocuments} from "../../../assets/js/redux/summaryRedux";
import {useEffect, useState} from "react";
import Preloader from "../../preloader/preloader";
import {getContent, num_word} from "../../../assets/js/helpers/functions";

let Tag = (props) => {
    return (
        <div className={"documents--tag inline-flex"}>{props.text}</div>
    )
}
let DocumentBlock = (props) => {
    let content = getContent(props.element.content.markup);
    return (
        <div className={"documents--block flex flex-column"}>
            <div className={"documents--top flex"}>
                <div>{new Date(props.element.issueDate).toLocaleDateString('ru-Ru')}</div>
                <a href={`/`}>{props.element.source.name}</a>
            </div>
            <div className={"documents--block-main flex flex-column"}>
                <div className={"documents--block-title"}>{props.element.title.text}</div>
                {props.element.attributes.isTechNews ? <Tag text={'Teхнические новости'}/> : ''}
                {props.element.attributes.isAnnouncement ? <Tag text={'Анонсы и события'}/> : ''}
                {props.element.attributes.isDigest ? <Tag text={'Сводки новостей'}/> : ''}

                <div className={"documents--image"}>
                    <img src={content.bgUrl ? content.bgUrl : 'https://placehold.co/600x400?text==('}
                         alt={"documents"}/>
                </div>
                <div className={"documents--description"}>
                    <p>{content.content}</p>
                </div>
                <div className={"documents--bottom flex flex-space-between flex-wrap"}>
                    <a href={`${props.element.url}`}>Читать в источнике</a>
                    <div>{`${props.element.attributes.wordCount} ${num_word(props.element.attributes.wordCount, ['слово','слова','слов'])}`}</div>
                </div>
            </div>
        </div>
    )
}
let Documents = () => {
    const dispatch = useDispatch();

    const [buttonPreloader, setButtonPreloader] = useState(true);
    const {
        objectSearch, index, documentsLoad, documents,
    } = useSelector((state) => state.summary);
    let initDocuments = () => {
        setButtonPreloader(true);
        getDocuments({
            ids: objectSearch[index]
        }).then(items => {
            setButtonPreloader(false)
            dispatch(setDocuments(items))
        })
    }
    useEffect(() => {
        if (objectSearch.length) {
            initDocuments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectSearch])

    return (
        <section id={"documents"}>
            <div className={"container"}>
                <div className={"documents--wrap"}>
                    <div className={"title small"}>Список документов</div>
                    {documentsLoad ? <>
                        <div className={"documents--main grid"}>
                            {documents.map((el, index) => {
                                return documents[index].map(item => {
                                    return <DocumentBlock key={Math.random()} element={item.ok}/>
                                })

                            })}
                        </div>
                        {Object.keys(objectSearch).length > index ?
                            <div className={"documents--more flex flex-center-horizontal"}>
                                <button disabled={buttonPreloader} onClick={() => {
                                    initDocuments(index)
                                }} type={"button"}>{!buttonPreloader ? 'Показать больше' : 'Загрузка...'}
                                </button>

                            </div> : ''}</> : <div className={"documents--preloader"}>
                        <Preloader/>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default Documents