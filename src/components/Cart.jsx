import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

const initialCartItems = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones Over-Ear",
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
        price: 89.99,
        stock: "In Stock",
    },
    {
        id: 2,
        title: "Minimalist Mechanical Keyboard RGB",
        thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300",
        price: 124.50,
        stock: "Only 2 left in stock",
    }
];

export default function Cart() {
    // Creating localized quantities dictionary state (e.g., { 1: 1, 2: 1 })
    const [cart, setCart] = useState(
        initialCartItems.map(item => ({ ...item, quantity: 1 }))
    );

    const handleQuantityChange = (id, newQty) => {
        if (newQty < 1) return;
        setCart(prev =>
            prev.map(item => (item.id === id ? { ...item, quantity: Number(newQty) } : item))
        );
    };

    const handleRemoveItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    // Math totals calculate dynamically
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 150 || subtotal === 0 ? 0.00 : 9.99;
    const tax = subtotal * 0.08; // 8% sales tax estimation
    const orderTotal = subtotal + shipping + tax;

    if (cart.length === 0) {
        return (
            <div className="empty-cart-container">
                <h2>Your Cart is empty.</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page-wrapper">
            <div className="cart-main-content">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-subtitle-count">{totalItems} items selected</p>

                {/* Item List Container */}
                <div className="cart-items-list">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item-card">
                            <div className="cart-item-image-wrapper">
                                <img src={item.thumbnail} alt={item.title} />
                            </div>

                            <div className="cart-item-details">
                                <div className="cart-item-header-row">
                                    <h3 className="cart-item-name">{item.title}</h3>
                                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>

                                <span className="cart-item-stock">{item.stock}</span>

                                {/* Management Row Actions */}
                                <div className="cart-item-actions">
                                    <div className="qty-selector">
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- ORDER SUMMARY SIDEBAR --- */}
            <aside className="cart-summary-sidebar">
                <h2>Order Summary</h2>

                <div className="summary-row">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                    <span>Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-row total-row">
                    <span>Order Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                <button className="checkout-btn" onClick={() => alert("Proceeding to payment securely...")}>
                    Proceed to Checkout
                </button>

                <div className="secure-badge">
                    🔒 Secure Checkout & Encryption Guarantee
                </div>
            </aside>
        </div>
    );
}