import { render } from '@czechitas/render';
import '../global.css';
import './index.css';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import Menu from '../components/Menu/Menu';
import Gallery from '../components/Gallery/Gallery';
import Contact from '../components/Contact/Contact';

const API_BASE = 'http://localhost:4000/api';
// get data from api
const response = await fetch(`${API_BASE}/drinks`);
const data = await response.json();
const drinksData = data.data;

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <Header />
    <main>
      <Banner />
      <Menu drinks={drinksData}/>
      <Gallery />
      <Contact />
    </main>
    <Footer />
  </div>
);

// mobile menu toggle
const navToggle = document.querySelector('.nav-btn');
const mobileNav = document.querySelector('.rollout-nav');

navToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('nav-closed');
});

mobileNav.addEventListener('click', () => {
  mobileNav.classList.add('nav-closed');
})

// order forms
const orderForms = document.querySelectorAll('.drink form');
orderForms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const drinkId = Number(e.target.dataset.id);

    // find drink in data
    const drink = drinksData.find(drink => drink.id === drinkId);
    const orderValue = !drink.ordered;

    // send order/cancelation to server
    const response = await fetch(`${API_BASE}/drinks/${drinkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        op: 'replace',
        path: '/ordered',
        value: orderValue,
      }]),
    });
    const data = await response.json();
    console.log(data);

  });
});
