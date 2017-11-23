/**
 * Created by bohdan on 15.11.2017.
 */

import Main from './js/Main'
import style from 'Styles/default.less'

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    parent.className = style.root;
    const main = new Main();
 //   parent.innerHTML = main.render();
    parent.appendChild(main.render());
});