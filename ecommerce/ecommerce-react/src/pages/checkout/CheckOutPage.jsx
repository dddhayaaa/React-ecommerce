import './checkout-header.css';
import { CheckoutHeader } from './CheckoutHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';


export function CheckOutPage({ cartItems,loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchDeliveryOptionData = async() =>{
    let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    setDeliveryOptions(response.data);
}
fetchDeliveryOptionData()
  },[])

  useEffect(() => {
    const fetchCheckoutData = async() => {
    
    let response = await axios.get('/api/payment-summary')
    setPaymentSummary(response.data)
  };
  fetchCheckoutData();

}, [cartItems])

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cartItems={cartItems} deliveryOptions={deliveryOptions} loadCart = {loadCart}></OrderSummary>

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}></PaymentSummary>
        </div>
      </div>
    </>
  );
}
