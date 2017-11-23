/**
 * Created by bohdan on 18.11.2017.
 */
import menuStyle from 'Styles/menu.less'

export default function menu(props) {

    const stylesList = props.stylesList.slice();
    const formattedDeckSize = formatSize(props.currentSize);//5,8,10 etc.
    const sizesList = constructSizesList(formattedDeckSize, props.sizesList);

    const html = `
            <div class="${menuStyle.topnav}" id="topNav">
                <div class="${menuStyle.dropdown}">
                    <button class="${menuStyle.dropbtn}" id="deckStyleBtn">APPEARANCE
                    </button>
                    <div class="${menuStyle.dropdown_content}" id="deckStyleList">
                        ${listToLinklist(stylesList)}
                    </div>
                </div>
                <div class="${menuStyle.dropdown}">
                    <button class="${menuStyle.dropbtn}" id="deckSizeBtn"">${formattedDeckSize}
                    </button>
                    <div class="${menuStyle.dropdown_content}" id="deckSizeList">
                        ${listToLinklist(sizesList)}
                    </div>
                </div>
                <a href="#">HIGHSCORES</a>
            </div>
        `;
    const template = document.createElement('template'); //is not supported by IE
    template.innerHTML = html;
    return document.importNode(template.content, true);
}

function listToLinklist (list) {
    "use strict";
    let res = ``;
    list.forEach( elem => {
        res += `<a href="#">${elem}</a>
                `;
    });
    return res;
}

function formatSize(rawSize) {
    "use strict";
    return `${rawSize} PAIRS`;
}

function constructSizesList(currentSize, sizesList) {
    "use strict";
    let DECK_SIZES = sizesList.map((current) => {return formatSize(current);});
    DECK_SIZES.splice(DECK_SIZES.indexOf(currentSize), 1);
    return DECK_SIZES;
}