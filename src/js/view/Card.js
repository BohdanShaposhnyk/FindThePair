/**
 * Created by bohdan on 23.11.2017.
 */
export default function card(props) {
    const Card = document.createElement('button');
    Card.onclick = () => {props.onClick();};
    Card.id = props.id;
    Card.value = props.value;
    Card.innerHTML = Card.id;
    Card.className = props.styles;
    return Card;
}