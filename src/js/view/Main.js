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

export default class Main extends Component {
    constructor(props, tag) {
        super(props, tag);

        this.children = this.initChildren();

        this._applyStylesFromObj(layout);
        this._applyStylesFromObj({ bg : this.state.layout.currentSkin.bg});
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
        this.children.timer.update({parent : this.children.menu.children.timer.me, id : IDs.timer});
    }

    menuProps() {
        return {
            parent : this.me,
            id : IDs.menu,
            handlers : {
                changeSkin : this.state.handlers.changeSkin,
                newGameMenuClick : this.state.handlers.newGameMenuClick
            }
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
                newGameClick : this.state.handlers.newGameClick

            }
        }
    }

    timerProps() {

    }

    initChildren() {
        const children =  {
            board : new Board(this.boardProps()),
            menu : new Menu(this.menuProps()),
            modal : new NewGame(this.modalProps())
        };
        children.timer = new Timer({parent : children.menu.children.timer.me, id : IDs.timer});

        return children;
    }

    getBoardProps() {

    }

    render() {
        this.updateChildren();
        this._insert();
    }
}

