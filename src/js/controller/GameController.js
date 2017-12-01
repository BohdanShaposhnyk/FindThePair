/**
 * Created by bohdan on 25.11.2017.
 */

import GameView from 'View/Main'
import Skins from 'Skins'
import GameLogic from 'Logic/GameLogic'
import GAME_STATES from 'Logic/GAME_STATES'



export default class GameController {
    constructor(parent) {//, model
        this.cardsSelected = [];
        this.parent = parent;
        this.layout = this._GET_DEFAULT_LAYOUT();
        this.handlers = {
            changeSizeHandler : (newSize) => {this.changeSizeHandler(newSize);},
            changeSkinHandler : (newSkin) => {this.changeSkinHandler(newSkin);},
            cardClickHandler : (index) => {this.cardClickHandler(index);},
            highscoresClickHandler : () => {this.highscoresClickHandler();}
        };
        this._resetGame();
    }

    _resetGame() {
        this.cardsSelected = [];
        this.gameLogic = new GameLogic(this.layout.currentSize * 2);
        this.gameView = new GameView({
            layout: this.layout,
            deck: this.gameLogic.deck,
            parent: this.parent,
            handlers : this.handlers,
            cardsSelected : this.cardsSelected.slice()
        });
    }

    changeSizeHandler(newSize) {
        this.layout.currentSize = newSize;
        this._resetGame();
        this.start();
    }

    changeSkinHandler(newSkin) {
        this.layout.currentSkin = Skins[newSkin];
        console.log('change');
        this.updateView({layout : this.layout, cardsSelected : this.cardsSelected});
    }

    highscoresClickHandler() {
        console.log('highscores');
    }

    cardClickHandler(index) {
        if (this.cardsSelected.indexOf(index) !== -1) return;
        const selected = this.cardsSelected.length;
        const newBoardState = {};
        switch (selected) {
            case 0:
                this.cardsSelected.push(index);
                newBoardState.gameState = GAME_STATES.ONE_SELECTED;
                newBoardState.cardsSelected = this.cardsSelected.slice();
                this.gameView.board.updateCard(newBoardState);
                break;
            case 1:
                this.cardsSelected.push(index);
                newBoardState.cardsSelected = this.cardsSelected.slice();
                newBoardState.gameState = this.gameLogic.makeMove(...this.cardsSelected);

                this.cardsSelected = [];
                this.gameView.board.updateCard(newBoardState);
                break;
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