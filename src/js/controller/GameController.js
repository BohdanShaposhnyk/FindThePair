/**
 * Created by bohdan on 01.12.2017.
 */
import Main from 'View/Main'
import Skins from 'Skins'
import GameLogic from 'Logic/GameLogic'
import GAME_STATES from 'Logic/GAME_STATES'
import IDs from 'View/IDs'
import TS from 'Logic/TimerStates'
import Storage from 'Model/HighscoresStorage'



export default class GameController {
    constructor(parent) {
        this.cardsSelected = [];
        this.parent = parent;
        this.storage = new Storage();
        this.layout = this._GET_DEFAULT_LAYOUT();
        this.gameLogic = new GameLogic(this.layout.currentSize * 2);
        this.gameView = new Main(this.getGameViewProps());
        this.gameView.children.modal.show();
        this.gameView.children.highscores.hide();
    }

    start() {
        this.gameView.render();
    }

    _GET_GAMEVIEW_RENDER_PROPS () {
        return {
            parent: this.parent,
            id : IDs.main
        }
    }

    _GET_GAME_STATE () {
        return {
            cardsSelected : this.cardsSelected.slice(),
            deck : this.gameLogic.deck.slice(),
            gameState : this.gameLogic.state
        }
    }

    getGameViewProps () {
        const renderProps = this._GET_GAMEVIEW_RENDER_PROPS();
        return {
            id : renderProps.id,
            parent : renderProps.parent,
            gameState: this._GET_GAME_STATE(),
            layout: this.layout,
            handlers : this.getHandlers(),
        }
    }

    _resetGame() {
        this.cardsSelected = [];
        this.gameLogic = new GameLogic(this.layout.currentSize * 2);
        this.gameView.children.board.resetIcons();
        this.gameView.update(this.getGameViewProps());
        this.gameView.children.timer.reset();
        this.gameView.children.timer.start();
        this.gameView.children.board.setClickable();
    }

    _GET_DEFAULT_LAYOUT() {
        const sizes = [5, 8, 10, 12];
        const defaultSize = 0;

        return {
            skins : Skins,
            currentSkin : Skins.classic,
            sizes : sizes,
            currentSize : defaultSize,
        };
    }

    getHandlers () {
        return {
            newGameClick : () => {this.newGameClickHandler();},
            onCardClick : (i) => {this.cardClickHandler(i);},
            changeSkin : (newSkin) => {this.changeSkinHandler(newSkin);},
            changeSize : (newSize) => {this.changeSizeHandler(newSize);},
            newGameMenuClick : () => {this.newGameMenuClickHandler();},
            restartGame : () => {this.gameRestartHandler();},
            pauseGame : () => {this.gamePauseHandler();},
            showHighscores : () => {this.highScoresClickHandler();},
            addHighscore : () => {this.addHighscore();}
        }
    }

    _pauseGame() {
        const timer = this.gameView.children.timer;
        const board = this.gameView.children.board;
        timer.stop();
        board.setUnclickable();
        console.log(`in pause game ${this.gameLogic.state}`);
    }

    _resumeGame() {
        const timer = this.gameView.children.timer;
        const board = this.gameView.children.board;
        timer.start();
        board.setClickable();
    }

    gamePauseHandler() {
        if (this.layout.currentSize === 0 ||
            this.gameLogic.state === GAME_STATES.GAME_FINISHED) return;
        const button = this.gameView.children.timer.children.pause.me;
        const status = this.gameView.children.timer.timerStatus;
        switch (status) {
            case TS.GOING:
                button.innerHTML = '&#9656';
                this._pauseGame();
                break;
            case TS.PAUSED:
                button.innerHTML = '&#10074;&#10074;';
                this._resumeGame();
                break;
        }
    }

    highScoresClickHandler() {
        this.gameView.children.highscores.update({
            scores : this.storage.getAll(),
            size: this.gameView.state.layout.currentSize
        });
        this.gameView.children.highscores.show();
    }

    gameRestartHandler() {
        if (this.layout.currentSize === 0) return;
        this._resetGame();
    }


    newGameMenuClickHandler() {
        this.gameView.children.modal.show();
    }

    newGameClickHandler() {
        if (this.gameView.children.modal.size === 0) return;
        this.gameView.children.modal.hide();
        this.layout.currentSize = this.gameView.children.modal.size;
        this._resetGame();
    }

    cardClickHandler(index) {
        if (this.cardsSelected.indexOf(index) !== -1) return;
        const selected = this.cardsSelected.length;
        const newBoardState = { gameState : {} };
        switch (selected) {
            case 0:
                this.cardsSelected.push(index);
                newBoardState.gameState.gameState = GAME_STATES.ONE_SELECTED;
                newBoardState.gameState.cardsSelected = this.cardsSelected.slice();
                this.gameView.children.board.updateCard(newBoardState);
                break;
            case 1:
                this.cardsSelected.push(index);
                newBoardState.gameState.cardsSelected = this.cardsSelected.slice();
                this.gameLogic.makeMove(...this.cardsSelected);
                newBoardState.gameState.gameState = this.gameLogic.state;

                this.cardsSelected = [];
                this.gameView.children.board.updateCard(newBoardState);
                if (this.gameLogic.state == GAME_STATES.GAME_FINISHED) {
                    this.gameView.children.timer.stop();
                    const scores = this.gameLogic.calculateScore(this.gameView.children.timer.time.getTime());
                    setTimeout( () => {
                        this.gameView.children.finished.update({score : scores, size : this.gameView.state.layout.currentSize});
                        this.gameView.children.finished.show();
                    }, 1000 );
                }
                break;
        }
    }

    addHighscore() {
        const scores = this.gameView.children.finished.state.score;
        const size = this.gameView.state.layout.currentSize;
        const player = this.gameView.children.finished.children.container.children.textInput.me.value;
        this.storage.addOne({player : player, score : scores, size : size});
    }

    changeSkinHandler(newSkin) {
        this.layout.currentSkin = newSkin;
        const timerStatus = this.gameView.children.timer.children.pause.me.innerHTML;
        const clickable = this.gameView.children.board._isClickable();
        this.gameView.update({layout : this.layout, gameState : this._GET_GAME_STATE()});
        this.gameView.children.timer.children.pause.me.innerHTML = timerStatus;
        (clickable) ?
            this.gameView.children.board.setClickable() : this.gameView.children.board.setUnclickable();
    }

    changeSizeHandler(newSize) {
        this.gameView.children.modal.size = newSize;
        this.gameView.children.modal.render();
    }

}