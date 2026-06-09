import './header.css';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

export function Header({ cart }) {
    let totalItems = 0;
    cart.forEach((item) => {
        totalItems += item.quantity;
    });

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const updateSearch = (event) => {
        setSearch(event.target.value);
    };


    const handleSearch = () => {
        if (!search.trim()) return;
        navigate(`/?search=${search}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <img className="logo" src="images/logo-white.png" />
                    <img className="mobile-logo" src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={updateSearch}
                    onKeyDown={handleKeyDown}
                />

                <button className="search-button" onClick={handleSearch}>
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link to="/orders" className="orders-link header-link">
                    <span className="orders-text">Orders</span>
                </Link>

                <Link to="/checkout" className="cart-link header-link">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalItems}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    );
}