import { Link } from 'react-router-dom';
import './ProductCard.css';

const formatPrice = (price) => {
  return '₹' + price.toLocaleString('en-IN');
};

const ProductCard = ({ id, name, price, originalPrice, badge, badgeType, image, icon }) => {
  return (
    <Link to={`/product/${id}`} className="product-card">
      {badge && (
        <div className={`product-badge ${badgeType === 'sold' ? 'sold' : badgeType === 'sale' ? 'sale' : ''}`}>
          {badge}
        </div>
      )}
      <div className="product-img">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <span className="product-img-icon">{icon}</span>
        )}
        <div className="product-overlay">
          <span className="overlay-btn-mock">View Details</span>
        </div>
      </div>
      <div className="product-info">
        <div className="product-name">{name}</div>
        <div className="product-price">
          {originalPrice && <del>{formatPrice(originalPrice)}</del>}
          {formatPrice(price)}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
