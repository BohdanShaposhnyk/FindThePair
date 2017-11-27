/**
 * Created by bohdan on 25.11.2017.
 */

import GameView from 'View/Main2'
import Skins from 'Skins'
import GameLogic from 'Logic/GameLogic'
import Styles from 'Styles'




import DEFAULT_GAME_PROPS from 'Utils/DEFAULT_GAME_PROPS'


export default class GameController {
    constructor(parent) {//, model
        this.cardsSelected = [];
        this.parent = parent;
        this.layout = this._GET_DEFAULT_LAYOUT();
        this.handlers = {
            changeSizeHandler : (newSize) => {this.changeSizeHandler(newSize);},
            changeSkinHandler : (newSkin) => {this.changeSkinHandler(newSkin);},
            cardClickHandler : (index) => {this.cardClickHandler(index);}
        };
        this._resetGame();
    }

    _resetGame() {
        this.gameLogic = new GameLogic(this.layout.currentSize * 2);
        this.gameView = new GameView({
            layout: this.layout,
            deck: this.gameLogic.deck,
            parent: this.parent,
            handlers : this.handlers
        });
    }

    changeSizeHandler(newSize) {
        this.layout.currentSize = newSize;
        this._resetGame();
        this.start();
    }

    changeSkinHandler(newSkin) {
        this.layout.currentSkin = newSkin;
        this._resetGame();
        this.start();
    }

    onHighscoresClick() {
        console.log('highscores');
    }


    cardClickHandler(index) {
        console.log(`clicked ${index} card`);
        const cards = this.gameLogic.deck.slice();
        console.log(cards);
        this.cardsSelected.push(index);
        if (this.cardsSelected.length == 2) {
            this.gameLogic.makeMove(...this.cardsSelected);
            this.cardsSelected = [];
        }
    }


    start() {
        this.gameView.render();
    }

    updateView(newProps) {
        this.gameView.update(newProps);
    }

    _GET_DEFAULT_LAYOUT() {
        const sizes = [5, 8, 10, 12];
        const defaultSize = sizes[0];

        return {
            skins : Skins,
            currentSkin : Skins.def,
            sizes : sizes,
            currentSize : defaultSize,
        };
    }


}