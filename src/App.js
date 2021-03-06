/**
 * Created by bohdan on 15.11.2017.
 */
import style from 'Styles/root.less'
import GameController from 'Controller/GameController'
import Main from 'View/Main'
import IDs from 'View/IDs'


document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    parent.className = style.root;
    const launcher = new GameController(parent);
    launcher.start();
});