import { OrderItem } from '../OrderItem';
import './style.css';

export const Order = (props = {}) => {
  const { items } = props;

  const element = document.createElement('main');
  element.classList.add('order');
  element.innerHTML = `
    <div class="order__content container">
      <h1>Vaše objedávnka</h1>
      <p class="empty-order empty-order--hide">Zatím nemáte nic objednáno</p>
      <div class="order__items"></div>
    </div>
  `;

  if (items === undefined) {
    fetch('https://apps.kodim.cz/daweb/cafelora/api/me/drinks', {
      method: 'GET',
      headers: {
        'Authorization': 'Email podlouckymartin@gmail.com',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const drinks = data.results.filter((drink) => drink.ordered);
        element.replaceWith(Order({ items: drinks }));
      });
  } else if (items.length === 0) {
    element.querySelector('.empty-order').classList.remove('empty-order--hide');
  } else {
    element.querySelector('.order__items').append(
      ...items.map((item) => OrderItem(item))
    );
  }

  return element;
}