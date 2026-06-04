import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './WishlistDrawer.css';

const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

const WishlistDrawer = ({ isOpen, onClose, wishlist, onRemoveFromWishlist, onMoveToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>My Wishlist ({wishlist.length})</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close wishlist"><FiX /></button>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-drawer-state">
            <span className="empty-icon">🤍</span>
            <p>Your wishlist is empty.</p>
            <button className="btn-outline" onClick={onClose}>Explore Collections</button>
          </div>
        ) : (
          <div className="drawer-items-list">
            {wishlist.map((product) => (
              <div className="drawer-item" key={product.id}>
                <div className="item-img-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="item-details">
                  <Link to={`/product/${product.id}`} className="item-name" onClick={onClose}>
                    {product.name}
                  </Link>
                  <span className="item-price">{formatPrice(product.price)}</span>
                  
                  <div className="item-actions-row">
                    <button 
                      className="move-to-cart-btn" 
                      onClick={() => onMoveToCart(product)}
                      disabled={product.badgeType === 'sold'}
                    >
                      <FiShoppingBag /> {product.badgeType === 'sold' ? 'Sold' : 'Add to Bag'}
                    </button>
                    
                    <button className="remove-item-btn" onClick={() => onRemoveFromWishlist(product.id)} aria-label="Remove item">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
