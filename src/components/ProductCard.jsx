import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductCard = ({ product }) => {
  const { cartCount, setCartCount } = useContext(ProductContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();


  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCartCount(cartCount + 1)

  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        {!imageLoaded && <div className="product-image-skeleton shimmer"></div>}
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`product-image ${imageLoaded ? "loaded" : "loading"}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="product-info">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-meta">
          <span className="product-price">${product.price}</span>
          <div className="product-rating">
            <span className="star-icon">★</span>
            <span className="rating-value">{product.rating}</span>
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;