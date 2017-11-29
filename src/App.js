/**
 * Created by bohdan on 15.11.2017.
 */

import style from 'Styles/root.less'
import GameController from 'Controller/GameController'

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    parent.className = style.root;
    const launcher = new GameController(parent);
    launcher.start();
});