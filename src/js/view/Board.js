
/**
 * Created by bohdan on 20.11.2017.
 */
import Component from './Component'
import Card from 'View/Card'
import Styles from 'Styles'
import GAME_STATES from 'Logic/GAME_STATES'
import icons from 'Logic/IconGenerator'

export default class Board extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
        this.cardsDOM = this._createCardsDOM();
        this.cardFaces = icons();
    }

    resetIcons() {
        this.cardFaces = icons();
    }

    openCard(i) {
        const spin = Styles.animations.spin;
        const card = this.cardsDOM[i];
        card.classList.add(spin);
    }

    closeCard(i) {
        const spin = Styles.animations.spin;
        const spin_back = Styles.animations.spin_back;
        const card = this.cardsDOM[i];
        card.classList.remove(spin);
        card.classList.add(spin_back);
    }

    leaveTheCardAlone(i) {
        const spin_back = Styles.animations.spin_back;
        const card = this.cardsDOM[i];
        card.classList.remove(spin_back);
    }

    hideCard(i) {
        const hide = Styles.card.hide;
        const card = this.cardsDOM[i];
        card.classList.add(hide);
    }

    onWinningMove() {
        const [index1, index2] = this.state.gameState.cardsSelected;
        this.openCard(index2);
        this.renderCard(index2);
        this.state.gameState.cardsSelected = [];
        setTimeout( () => {
            this.hideCard(index1);
            this.hideCard(index2);
        }, 100 );
    }

    updateCard(props) {
        this._setState(props);
        const gameState = this.state.gameState.gameState;
        let index1 = null;
        let index2 = null;
        switch (gameState) {
            case GAME_STATES.NO_SELECTION:
                break;
            case GAME_STATES.ONE_SELECTED:
                index1 = this.state.gameState.cardsSelected[0];
                const card = this.cardsDOM[index1];
                card.classList.add(Styles.animations.spin);
                this.renderCard(index1);
                break;
            case GAME_STATES.GAME_FINISHED:
                this.onWinningMove();
                break;
            case GAME_STATES.WIN:
                this.onWinningMove();
                break;
            case GAME_STATES.LOSE:
                [index1, index2] = this.state.gameState.cardsSelected;
                this.openCard(index2);
                this.renderCard(index2);
                this.state.gameState.cardsSelected = [];
                setTimeout( () => {
                    this.closeCard(index1);
                    this.closeCard(index2);
                    this.renderCard(index1);
                    this.renderCard(index2);
                }, 500 );
                setTimeout( () => {
                    this.leaveTheCardAlone(index1);
                    this.leaveTheCardAlone(index2);
                }, 650 );
        }
    }

    _isClickable() {
        return !this.me.classList.contains(Styles.board.noclick);
    }

    setClickable() {
        if (!this._isClickable()) {
            this.me.classList.remove(Styles.board.noclick);
        }
    }

    setUnclickable() {
        if (this._isClickable()) {
            this.me.classList.add(Styles.board.noclick);
        }
    }

    renderCard(index) {
        const card = this.cardsDOM[index];
        if ( card.value === null ) this.hideCard(index);
        if ( this.state.gameState.cardsSelected.indexOf(index) !== -1 ) {
            this.openCard(index);
        }
        const inDOM = this.me.querySelector(`#${card.id}`);

        if (inDOM) {
            this.me.replaceChild(card,inDOM);
        } else {
            this.me.appendChild(card);
        }
    }

    createCard(i) {
        return Card({
            id : `c${i}`,
            icon : this.cardFaces[this.state.gameState.deck[i]],
            value : this.state.gameState.deck[i],
            onClick : () => {this.state.handlers.onCardClick(i)},
            skin : this.state.layout.currentSkin,
            size : this.state.layout.currentSize

        })
    }

    _createCardsDOM() {
        while (this.me.hasChildNodes()) {
            this.me.removeChild(this.me.lastChild);
        }
        const cardsDOM = [];
        for (let i = 0; i < this.state.gameState.deck.length; i++) {
            cardsDOM.push(this.createCard(i));
        }
        return cardsDOM;
    }

    _getClassesNeeded() {
        const sizeName = `board${this.state.layout.currentSize}`;
        return [
            Styles.board.board,
            Styles.sizes[sizeName],
            this.state.layout.currentSkin.board
        ];
    }

    render() {

        this.me.className = '';
        this.me.classList.add(...this._getClassesNeeded());
        this.cardsDOM = this._createCardsDOM();
        for (let i=0; i < this.state.gameState.deck.length; i++) {
            this.renderCard(i);
        }
        this._insert(this.me);
    }
}
