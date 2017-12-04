/**
 * Created by bohdan on 15.11.2017.
 */
import style from 'Styles/root.less'
//import GameController from 'Controller/GameController'
import Main from 'View/Main'
import IDs from 'View/IDs'
import GameController from 'Controller/Controller2'

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    parent.className = style.root;
    // const launcher = new GameController(parent);
    // launcher.start();
    const props = {
        id : IDs.main,
        parent : parent
    };
    // const main = new Main(props);
    // main.render();
    const launcher = new GameController(parent);
    launcher.start();
});