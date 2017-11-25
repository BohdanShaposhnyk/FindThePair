/**
 * Created by bohdan on 15.11.2017.
 */

import Main from './js/view/Main'
import style from 'Styles/root.less'

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    parent.className = style.root;
    const main = new Main({parent : parent});
    parent.appendChild(main.render());
});