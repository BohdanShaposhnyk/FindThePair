/**
 * Created by bohdan on 15.11.2017.
 */
import menu from 'Styles/menu.less'
export default `
<div class="${menu.topnav}" id="topNav">
    <div class="${menu.dropdown}">
        <button class="${menu.dropbtn}" id="deckStyleBtn">DECK
            <i class="fa fa-caret-down"</i>
        </button>
        <div class = "${menu.dropdown_content}" id="deckStyleList">
            <a href="#">Style1</a>
            <a href="#">Style2</a>
            <a href="#">Style3</a>
        </div>
    </div>
    <div class="${menu.dropdown}">
        <button class="${menu.dropbtn}" id="deckSizeBtn"">5X5
            <i class="fa fa-caret-down"</i>
        </button>
        <div class = "${menu.dropdown_content}" id="deckSizeList">
            <a href="#">8X8</a>
            <a href="#">10X10</a>
            <a href="#">12X12</a>
        </div>
    </div>
    <a href="#">HIGHSCORES</a>
</div>
`;