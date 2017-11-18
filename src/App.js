/**
 * Created by bohdan on 15.11.2017.
 */

//import menu from './js/markup/TopNavBar'
import menu from './js/Menu'

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    const elem = document.createElement('div');
    const testMenuProps = {
        currentSize: 5,
        stylesList: ['style1', 'style2', 'style3', 'style4']
    };
    elem.innerHTML = menu(testMenuProps);
    parent.appendChild(elem);
});