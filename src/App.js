/**
 * Created by bohdan on 15.11.2017.
 */

import menu from './js/markup/TopNavBar'

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    const elem = document.createElement('div');
    elem.innerHTML = menu;
    parent.appendChild(elem);
});