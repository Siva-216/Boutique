import { FiX, FiMinus, FiPlus, FiTrash2, FiMessageCircle } from 'react-icons/fi';
import './CartDrawer.css';

const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

const CartDrawer = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Generate WhatsApp order message with cart details
  const getWhatsAppLink = () => {
    let text = `Hello Fashion World! I would like to place an order for:\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.product.name}\n   Size/Option: ${item.size}\n   Qty: ${item.quantity} x ${formatPrice(item.product.price)}\n\n`;
    });
    text += `Subtotal: ${formatPrice(subtotal)}\n\n Please confirm availability and shipping details. Thank you!`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close cart"><FiX /></button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-drawer-state">
            <span className="empty-icon">🛍️</span>
            <p>Your shopping bag is empty.</p>
            <button className="btn-outline" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="drawer-items-list">
              {cart.map((item) => (
                <div className="drawer-item" key={`${item.product.id}-${item.size}`}>
                  <div className="item-img-wrapper">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="item-details">
                    <span className="item-name">{item.product.name}</span>
                    <span className="item-option">Size: {item.size}</span>
                    <span className="item-price">{formatPrice(item.product.price)}</span>
                    
                    <div className="item-actions-row">
                      <div className="qty-counter">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.size, -1)} aria-label="Decrease quantity">
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.size, 1)} aria-label="Increase quantity">
                          <FiPlus />
                        </button>
                      </div>
                      
                      <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.product.id, item.size)} aria-label="Remove item">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="footer-notice">* Shipping and taxes calculated at checkout. Custom tailoring requests included.</p>
              
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="checkout-whatsapp-btn">
                <FiMessageCircle /> Checkout via WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
