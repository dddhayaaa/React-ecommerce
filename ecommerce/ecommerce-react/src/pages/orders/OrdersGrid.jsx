import { OrdersHeader } from "./OrdersHeader";
import { Fragment } from "react";
import { OrderDetailGrid } from "./OrderDetailGrid";

export function Ordersgrid({orders,loadCart}) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (

                    <div key={order.id} className="order-container">

                       <OrdersHeader orders={order}></OrdersHeader>

                       <OrderDetailGrid order={order} loadCart={loadCart}></OrderDetailGrid>
                    </div>

                );

            })}

        </div>
    );
}