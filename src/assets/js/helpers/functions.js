import {decode} from 'html-entities';

let Error = (props) => {
    return (
        <div className={"error--text"}>{props.text}</div>
    )
}


let num_word = (value, words) => {
    value = Math.abs(value) % 100;
    let num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
}
let Arrow = (props) => {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <button type={"button"} className={`keen-arrow flex ${
            props.left ? "arrow--left" : "arrow--right"
        }`}>
            <svg
                onClick={props.onClick}
                className={`arrow  ${disabled}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                {props.left && (
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
                          fill={"currentColor"}/>
                )}
                {!props.left && (
                    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" fill={"currentColor"}/>
                )}
            </svg>
        </button>
    )
}

function spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}


const getFirstImageUrl = (decodedContent) => {
    const images = decodedContent.match(/<img src="(.*?)"/m);

    return images ? images[1] : null;
};

const decodeContent = (markup) => {
    return decode(markup);
};

const removeAllTags = (content) => {
    return content.replace(/<.*?>/g, ' ');
};

const getContent = (markup) => {
    const decodedContent = decodeContent(markup);
    const bgUrl = getFirstImageUrl(decodedContent);
    const content = removeAllTags(decodedContent).slice(0, 700) + '…';

    return {
        bgUrl,
        content,
    };
};


export {Error, Arrow, spliceIntoChunks, getContent, num_word}