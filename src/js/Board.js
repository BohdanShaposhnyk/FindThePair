/**
 * Created by bohdan on 20.11.2017.
 */
import Component from './Component'
import Card from './Card'
import style from 'Styles/board.less'

export default class Board extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let cards = ``;
        for (let i = 0; i < 20; i++) {
            cards += `
                    ${Card()}`;
        }
        return `
                <div class="${style.board}">
                    ${cards}
                </div>
            `;
    }

}