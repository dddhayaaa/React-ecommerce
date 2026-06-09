import { HomePage } from './pages/home/HomePage'
import { CheckOutPage } from './pages/checkout/CheckOutPage'
import OrderPage from './pages/orders/OrderPage'
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Tracking } from './pages/tracking/Tracking'
import './App.css'

function App() {
  
  window.axios = axios;

  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
  const response = await axios.get('/api/cart-items?expand=product')
  setCartItems(response.data);

  };

  useEffect(() => {
    loadCart();
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} loadCart={loadCart} />} />
        <Route path="/checkout" element={<CheckOutPage cartItems={cartItems} loadCart = {loadCart}/>} />
        <Route path="/orders" element={<OrderPage cart={cartItems} loadCart={loadCart} />} />
        <Route path="/tracking/:orderId/:productId" element={<Tracking cart={cartItems} />} />

      </Routes>
    </>
  )
}

export default App;
