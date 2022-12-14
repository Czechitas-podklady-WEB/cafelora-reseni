import { Drink } from './components/Drink';
import './style.css';

export const Menu = (props = {}) => {
  const { drinks } = props;

  const element = document.createElement('section');
  element.classList.add('menu');
  element.id = 'menu';
  element.innerHTML = `
    <div class="container">
      <h2>Naše nabídka</h2>
      <p class="menu-intro">
        Vyberte si z našeho interaktivního menu a nemusíte čekat na obsluhu
      </p>
      <div class="drinks-list"></div>
      <div class="order-detail">
        <a href="/objednavka">Detail objednávky</a>
      </div>
    </div>
  `;

  if (drinks === undefined) {
    fetch('https://apps.kodim.cz/daweb/cafelora/api/me/drinks', {
      method: 'GET',
      headers: {
        'Authorization': 'Email podlouckymartin@gmail.com',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        element.replaceWith(Menu({ drinks: data.results }));
      });
  } else {
    element.querySelector('.drinks-list').append(
      ...drinks.map((drink) => Drink(drink))
    );
  }

  return element;
}
