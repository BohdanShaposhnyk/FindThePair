/**
 * Created by bohdan on 18.11.2017.
 */
import menuStyle from 'Styles/menu.less'

export default function menu(props) {

    const stylesList = props.stylesList.slice();
    const formattedDeckSize = formatSize(props.currentSize);//5,8,10 etc.
    const sizesList = constructSizesList(props.currentSize, props.sizesList);
    console.log(stylesList);
    const stylesDOM = listToLinklist(stylesList, 'style', props.handlers);
    const sizesDOM = listToLinklist(sizesList, 'size', props.handlers);
    const highscores = document.createElement('a');
    highscores.innerHTML = 'HIGHSCORES';
    highscores.onclick = () => {props.handlers.highscores();};


    const html = `
            <div class="${menuStyle.topnav}" id="topNav">
                <div class="${menuStyle.dropdown}">
                    <button class="${menuStyle.dropbtn}" id="deckStyleBtn">APPEARANCE
                    </button>
                    <div class="${menuStyle.dropdown_content}" id="deckStyleList">
                    </div>
                </div>
                <div class="${menuStyle.dropdown}">
                    <button class="${menuStyle.dropbtn}" id="deckSizeBtn"">${formattedDeckSize}
                    </button>
                    <div class="${menuStyle.dropdown_content}" id="deckSizeList">
                    </div>
                </div>
            </div>
        `;
    const template = document.createElement('template'); //is not supported by IE
    template.innerHTML = html;
    const res = document.importNode(template.content, true);
    const styleListSelector = res.querySelector('#deckStyleList');
    const sizeListSelector = res.querySelector('#deckSizeList');
    stylesDOM.forEach( (item) => {
        "use strict";
        styleListSelector.appendChild(item);
    } );
    sizesDOM.forEach( (item) => {
        "use strict";
        sizeListSelector.appendChild(item);
    } );
    res.querySelector('#topNav').appendChild(highscores);
    return res;

}

function listToLinklist (list, idBase, handlers) {
    "use strict";
    let res = [];
    list.forEach( (elem) => {
        let node = document.createElement('a');
        switch (idBase) {
            case 'style':
                node.id = idBase + elem.id;
                node.innerHTML = elem.name;
                node.onclick = () => {handlers.onStyleChange(elem);};
                break;
            case 'size':
                node.id = idBase + elem;
                node.innerHTML = formatSize(elem);
                node.onclick = () => {handlers.onSizeChange(elem);};
        }
        res.push(node); // `<a id="${id}">${inner}</a>`;
    });
    return res;
}

function formatSize(rawSize) {
    "use strict";
    return `${rawSize} PAIRS`;
}


function constructSizesList(currentSize, sizesList) {
    "use strict";
    let DECK_SIZES = sizesList.slice();
    DECK_SIZES.splice(DECK_SIZES.indexOf(currentSize), 1);
    return DECK_SIZES;
}


