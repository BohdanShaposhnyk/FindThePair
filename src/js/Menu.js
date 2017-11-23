/**
 * Created by bohdan on 18.11.2017.
 */
import menuStyle from 'Styles/menu.less'

export default function menu(props) {

    const stylesList = props.stylesList.slice();
    const formattedDeckSize = `${props.currentSize}X${props.currentSize}`;//5,8,10 etc.
    const sizesList = constructSizesList(formattedDeckSize);

    return `
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

function constructSizesList(currentSize) {
    "use strict";
    let DECK_SIZES = [
        '5X5', '8X8', '10X10', '12X12'
    ];
    DECK_SIZES.splice(DECK_SIZES.indexOf(currentSize), 1);
    return DECK_SIZES;
}