import { render } from '@czechitas/render';
import '../global.css';
import './index.css';
import './order.css';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Order from '../components/Order/Order';

const API_BASE = 'http://localhost:4000/api';
// get data from api
const response = await fetch(`${API_BASE}/drinks?filter=ordered:eq:true&select=id,name,image`);
const data = await response.json();
const orderData = data.data;

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <div className="page">
      <Header showMenu={false} />
      <Order items={orderData} />
      <Footer />
    </div>
  </div>
);
