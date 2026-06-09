import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
import axios from 'axios';

export function OrderSummary({cartItems,deliveryOptions,loadCart}) {
    return (

        <div className="order-summary">
            {deliveryOptions.length > 0 && cartItems.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                })
                const deleteCartItem = async() =>{
                    await axios.delete(`/api/cart-items/${cartItem.productId}`);
                    await loadCart();
                }
                return (

                    <div key={cartItem.productId} className="cart-item-container">
                        
                        <DeliveryDate selectedDeliveryOption={selectedDeliveryOption}></DeliveryDate>

                        <div className="cart-item-details-grid">

                            <CartItemDetails cartItem={cartItem} onClick ={deleteCartItem} loadCart={loadCart}></CartItemDetails>

                            <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart = {loadCart}></DeliveryOptions>
                        </div>
                    </div>
                )
            })}

        </div>

    );
}