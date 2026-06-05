import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import Loader from "../components/Loader";
import { ProductContext } from "../context/ProductContext";
import "../styles/ProductDetails.css";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { cartCount, setCartCount } = useContext(ProductContext);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            const data = await getProductById(id);
            setProduct(data);
        };
        loadProduct();
    }, [id]);

    if (!product) return <Loader />;

    const handleAddToCart = () => {
        setCartCount(cartCount + 1);
    };

    return (
        <div className="detail-page-container">
            <div className="detail-top-nav">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back to Products
                </button>
            </div>

            <div className="product-detail-layout">

                <div className="product-media-column">
                    <div className="main-image-card">
                        {!imageLoaded && <div className="product-image-skeleton shimmer"></div>}
                        <img 
                            src={product.thumbnail} 
                            alt={product.title} 
                            className={imageLoaded ? "loaded" : "loading"}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                </div>

                <div className="product-info-column">
                    <span className="info-brand-tag">{product.brand}</span>
                    <h1 className="info-title">{product.title}</h1>

                    <div className="info-rating-row">
                        <div className="info-rating-badge">
                            <span>★</span> {product.rating}
                        </div>
                        <span className="info-category-label">in <strong>{product.category}</strong></span>
                    </div>

                    <hr className="info-divider" />

                    <div className="info-price-block">
                        <span className="price-currency">$</span>
                        <span className="price-amount">{product.price}</span>
                        <span className="tax-inclusion-note">Inclusive of all taxes</span>
                    </div>

                    <div className="info-description-block">
                        <h3>About this item</h3>
                        <p>{product.description}</p>
                    </div>

                    <hr className="info-divider" />

                    <div className="info-actions-wrapper">
                        <button className="btn-add-to-cart" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className="btn-buy-now" onClick={() => alert("Proceeding directly to checkout...")}>
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;