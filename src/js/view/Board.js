
/**
 * Created by bohdan on 20.11.2017.
 */
import Component from './Component'
import Card from 'View/Card'
import Styles from 'Styles'
import GAME_STATES from 'Logic/GAME_STATES'

export default class Board extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
        this.cardsDOM = this._createCardsDOM();
        this.me = document.createElement('div');
        this.me.id = 'board';
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
        const spin = Styles.animations.spin;
        const spin_back = Styles.animations.spin_back;
        const card = this.cardsDOM[i];
        card.classList.remove(spin_back);
    }

    hideCard(i) {
        const hide = Styles.board.hide;
        const card = this.cardsDOM[i];
        card.classList.add(hide);
    }

    updateCard(props) {
        this._setState(props);
        const gameState = this.state.gameState;
        let index1 = null;
        let index2 = null;
        switch (gameState) {
            case GAME_STATES.NO_SELECTION:
                break;
            case GAME_STATES.ONE_SELECTED:
                index1 = this.state.cardsSelected[0];
                const card = this.cardsDOM[index1];
                card.classList.add(Styles.animations.spin);
                this.renderCard(index1);
                break;
            case GAME_STATES.TWO_SELECTED:
                break;
            case GAME_STATES.WIN:
                [index1, index2] = this.state.cardsSelected;
                console.log(`in WIN ${index1} ${index2}`);
                this.openCard(index2);
                this.renderCard(index2);
                this.state.cardsSelected = [];
                setTimeout( () => {
                    this.hideCard(index1);
                    this.hideCard(index2);
                }, 300 );
                break;
            case GAME_STATES.LOSE:
                [index1, index2] = this.state.cardsSelected;
                console.log(`in LOSE ${index1} ${index2}`);
                this.openCard(index2);
                this.renderCard(index2);
                this.state.cardsSelected = [];
                setTimeout( () => {
                    this.closeCard(index1);
                    this.closeCard(index2);
                    this.renderCard(index1);
                    this.renderCard(index2);
                }, 500 );
                setTimeout( () => {
                    this.leaveTheCardAlone(index1);
                    this.leaveTheCardAlone(index2);
                }, 1000 );
        }
    }

    renderCard(index) {
        const card = this.cardsDOM[index];
        if ( card.value === null ) this.hideCard(index);
        if ( this.state.cardsSelected.indexOf(index) !== -1 ) {
            this.openCard(index);
        }
        const inDOM = this.me.querySelector(`#${card.id}`);

        if (inDOM) {
            this.me.replaceChild(card,inDOM);
        } else {
            this.me.appendChild(card);
        }
     }

     createCard(i, back, layout) {
        return Card({
             id : `c${i}`,
             value : this.state.deck[i],
             onClick : () => {this.state.onClick(i)},
             layout : layout,
             front : Styles.board.front,
             back : back
         })
     }

    _createCardsDOM() {
        const cardsDOM = [];
        const back = [];
        back.push(this.state.layout.currentSkin['back']);
        back.push(Styles.board.back);
        const layout = this._getClassesNeeded('card');
        for (let i = 0; i < this.state.deck.length; i++) {
            cardsDOM.push(this.createCard(i,back,layout.slice()));
        }
        return cardsDOM;
    }

    _getClassesNeeded(cardOrBoard) {
        const sizeName = cardOrBoard + this.state.layout.currentSize;
        return [
            Styles.board[cardOrBoard],
            Styles.sizes[sizeName],
        ];
    }

    render() {
        console.log('render board');
        this.me.className = '';
        this.me.classList.add(...this._getClassesNeeded('board'));
        this.me.classList.add(this.state.layout.currentSkin['board']);
        console.log(`classes: ${this.me.classList}`);
        this.cardsDOM = this._createCardsDOM();
        for (let i=0; i < this.state.deck.length; i++) {
            this.renderCard(i);
        }
        this._insert(this.me);
    }
}
