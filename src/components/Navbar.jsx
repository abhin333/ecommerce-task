import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";

const Navbar = () => {
    const { cartCount } = useContext(ProductContext);
    useEffect(() => {
    }, [cartCount])

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    ShopHub<span className="logo-dot">.in</span>
                </Link>

                <div className="nav-delivery">
                    <span className="text-light">Deliver to</span>
                    <span className="text-bold">India</span>
                </div>

                <div className="nav-search">
                    <input
                        type="text"
                        placeholder="Search ShopHub"
                        className="search-input"
                    />
                    <button className="search-button">
                        🔍
                    </button>
                </div>

                <div className="nav-links">
                    <Link to="/" className="nav-link-item">
                        <span className="text-light">Hello, sign in</span>
                        <span className="text-bold">Account & Lists</span>
                    </Link>

                    <Link to="/" className="nav-link-item hide-mobile">
                        <span className="text-light">Returns</span>
                        <span className="text-bold">& Orders</span>
                    </Link>

                    <Link to="/" className="nav-cart">
                        <div className="cart-icon">
                            <span className="cart-count">{cartCount}</span>
                            🛒
                        </div>
                        <span className="text-bold hide-mobile">Cart</span>
                    </Link>
                </div>
            </div>


        </nav>
    );
};

export default Navbar;