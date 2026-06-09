import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import axios from 'axios';
import './tracking.css'
import dayjs from 'dayjs';

export function Tracking({ cart }) {
  const { orderId, productId } = useParams();
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`)
      setTrackingOrder(response.data)

    };
    fetchTrackingData();
  }, [orderId])

  if (!trackingOrder) {
    return null;
  }

  const orderProduct = trackingOrder?.products?.find((orderProduct) => {
    return orderProduct.productId == productId;
  });

  if (!orderProduct) {
    return null;
  }

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - trackingOrder.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - trackingOrder.orderTimeMs;
  //const timePassedMs = totalDeliveryTimeMs * 0.3;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  let deliveryStatus = '';

  if (deliveryPercent < 33) {
    deliveryStatus = "isPreparing"
  }
  else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    deliveryStatus = "isShipped"
  }
  else {
    deliveryStatus = "isDelivered";
  };

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">

        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${deliveryStatus === "isPreparing" ? "current-status" : ""}`}>
              Preparing
            </div>

            <div className={`progress-label ${deliveryStatus === "isShipped" ? "current-status" : ""}`}>
              Shipped
            </div>

            <div className={`progress-label ${deliveryStatus === "isDelivered" ? "current-status" : ""}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}></div>
          </div>
        </div>
      </div>

    </>
  );
}