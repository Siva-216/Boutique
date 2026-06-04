import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import './Header.css';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'Collections', href: '/#collections' },
  { label: 'New Arrivals', href: '/#new-arrivals' },
  { label: 'Occasions', href: '/#occasion' },
  { label: 'Heritage', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const Header = ({ cart, wishlist, onOpenCart, onOpenWishlist }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
        <Link to="/" className="logo">
          <span className="logo-main">Fashion World</span>
        </Link>
        <nav className={`nav-links${mobileOpen ? ' open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Link to="/profile" className="account-nav-btn" aria-label="Account"><FiUser /></Link>
          
          <button aria-label="Wishlist" onClick={onOpenWishlist} style={{ position: 'relative' }}>
            <FiHeart />
            {wishlist.length > 0 && <span className="wishlist-count">{wishlist.length}</span>}
          </button>
          
          <button aria-label="Cart" onClick={onOpenCart} style={{ position: 'relative' }}>
            <FiShoppingBag />
            <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
