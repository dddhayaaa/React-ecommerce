import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from "axios";

export function CartItemDetails({ cartItem, onClick, loadCart }) {

    const [showInput, setShowInput] = useState(false);
    const [quantityCount, setQuantityCount] = useState(cartItem.quantity);


    function updateQuantityCount(event) {
        const value = event.target.value;
        if (value === "") {
            setQuantityCount("");
            return;
        }

        const num = Number(value);

    
        if (num >= 1) {
            setQuantityCount(num);
        }
    }

    const updateQuantity = async () => {
    
        if (!showInput) {
            setShowInput(true);
            return;
        }

        if (!quantityCount || quantityCount < 1) return;

        try {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantityCount),
            });

            await loadCart(); 
            setShowInput(false); 

        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            await updateQuantity(); 
        }

        if (event.key === "Escape") {
            setQuantityCount(cartItem.quantity); 
            setShowInput(false); 
        }
    };

    return (
        <>
            <img 
                className="product-image"
                src={cartItem.product.image}
                alt={cartItem.product.name}
            />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>

                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>

                <div className="product-quantity">

                    {}
                    <input
                        className="quantity-count"
                        style={{ display: showInput ? "inline-block" : "none", width: "50px" }}
                        type="number"
                        min="1"
                        value={quantityCount}
                        onChange={updateQuantityCount}
                        onKeyDown={handleKeyDown}
                    />

                    <span>
                        Quantity:{" "}
                        <span className="quantity-label">
                            {cartItem.quantity}
                        </span>
                    </span>

                    <span 
                        className="update-quantity-link link-primary" 
                        onClick={updateQuantity}
                    >
                        {showInput ? "Save" : "Update"}
                    </span>

                    <span 
                        className="delete-quantity-link link-primary" 
                        onClick={onClick}
                    >
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}