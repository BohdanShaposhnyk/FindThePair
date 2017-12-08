/**
 * Created by bohdan on 01.12.2017.
 */
import Component from 'View/Component'
import layout from 'Styles/main'
import IDs from 'View/IDs'
import Board from 'View/Board'
import Menu from 'View/Menu'
import Timer from 'View/Timer'
import NewGame from 'View/NewGame'
import GameFinishedModal from 'View/GameFinished'
import Highscores from 'View/Highscores'

export default class Main extends Component {
    constructor(props, tag) {
        super(props, tag);

        this.children = this.initChildren();

        this._applyStylesFromObj(layout);
        window.onclick = (e) => {
            if (e.target == this.children.modal.me) {
                this.children.modal.hide();
            }
            if (e.target == this.children.finished.me ) {
                this.children.finished.hide();
            }
            if (e.target == this.children.highscores.me ) {
                this.children.highscores.hide();
            }
        };

    }

    boardProps() {
        return {
            parent : this.me,
            id : IDs.board,
            gameState : this.state.gameState,
            layout : this.state.layout,
            handlers : { onCardClick : this.state.handlers.onCardClick}
        }
    }

    updateChildren() {
        this.children.menu.update(this.menuProps());
        this.children.board.update(this.boardProps());
        this.children.modal.update(this.modalProps());
        this.children.timer.update({
            parent : this.children.menu.children.timer.me,
            id : IDs.timer
        });
        this.children.highscores.update({scores : []});
    }

    menuProps() {
        return {
            parent : this.me,
            id : IDs.menu,
            handlers : {
                changeSkin : this.state.handlers.changeSkin,
                newGameMenuClick : this.state.handlers.newGameMenuClick,
                showHighscores : this.state.handlers.showHighscores
            },
            skinsList : this.state.layout.skins,
            currentSkin : this.state.layout.currentSkin
        }
    }

    modalProps() {
        return {
            parent : this.me,
            id : IDs.modal,
            layout : this.state.layout,
            handlers : {
                changeSkin : this.state.handlers.changeSkin,
                changeSize : this.state.handlers.changeSize,
                newGameClick : this.state.handlers.newGameClick,
                showHighscores : this.state.handlers.showHighscores
            }
        }
    }

    initChildren() {
        const children =  {
            board : new Board(this.boardProps()),
            menu : new Menu(this.menuProps()),
            modal : new NewGame(this.modalProps()),
            finished : new GameFinishedModal({
                id : IDs.gameFinishedModal,
                parent : this.me,
                handlers : {
                    addHighscore : () => {this.state.handlers.addHighscore();},
                    restartGame : () => {this.state.handlers.restartGame();},
                    newGame : () => {this.state.handlers.newGameMenuClick();}
                }
            }),
            highscores : new Highscores({
                id : IDs.highscores,
                parent : this.me,
                size : this.state.layout.currentSize
            })
        };
        children.timer = new Timer({
            parent : children.menu.children.timer.me,
            id : IDs.timer,
            handlers : {
                restartGame : this.state.handlers.restartGame,
                pauseGame : this.state.handlers.pauseGame
            }
        });

        return children;
    }

    clearBgSkin() {
        Object.values(this.state.layout.skins).forEach( (skin) => {
            if (this.me.classList.contains(skin.bg)) {
                this.me.classList.remove(skin.bg);
            }
        } );

    }

    render() {
        this.clearBgSkin();
        this._applyStylesFromObj({ bg : this.state.layout.currentSkin.bg});
        this.updateChildren();
        this.children.highscores.hide();

        this._insert();
    }
}

