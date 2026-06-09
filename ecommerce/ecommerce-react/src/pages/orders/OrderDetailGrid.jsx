import { Fragment } from "react";
import { Link } from "react-router";
import { OrderProdcuts } from "./OrderProducts";

export function OrderDetailGrid({order,loadCart}) {

    return (

        <div className="order-details-grid">
            {order.products.map((orderProduct) => {
                return(
                   <OrderProdcuts orderProduct={orderProduct} order ={order} loadCart={loadCart}></OrderProdcuts>

                )
            })}

        </div>
    );
}