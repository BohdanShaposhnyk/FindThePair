
/**
 * Created by bohdan on 23.11.2017.
 */
export default function card(props) {
    const Card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');
    front.className = props.front;
    back.classList.add(...props.back);
    front.innerHTML = `<p>${props.value}</p>`;
    Card.appendChild(front);
    Card.appendChild(back);
    Card.onclick = () => {props.onClick();};
    Card.id = props.id;
    Card.value = props.value;
    Card.classList.add(...props.layout);
    return Card;
}