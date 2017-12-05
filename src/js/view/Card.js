
/**
 * Created by bohdan on 23.11.2017.
 */

import layout from 'Styles/card'
import sizes from 'Styles/sizes'


export default function card(props) {
    const sizeName = `card${props.size}`;
    const Card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');
    front.className = layout.front;
    back.classList.add(props.skin.back, layout.back);

    front.innerHTML = `<p>${props.icon}</p>`;
    Card.appendChild(front);
    Card.appendChild(back);
    Card.onclick = () => {props.onClick();};
    Card.id = props.id;
    Card.value = props.value;
    Card.classList.add(layout.card, sizes[sizeName]);
    return Card;
}