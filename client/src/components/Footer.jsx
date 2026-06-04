import { FiFacebook, FiInstagram, FiYoutube, FiPhone } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-main">Fashion World</span>
              <span className="logo-sub devanagari" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem' }}>
                फैशन वर्ल्ड
              </span>
            </div>
            <p>
              Handloom silk sarees crafted with four decades of heritage. Each drape tells a
              story of timeless Indian artistry and tradition.
            </p>
            <div className="social">
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="YouTube"><FiYoutube /></a>
              <a href="#" aria-label="WhatsApp"><FiPhone /></a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">My Account</a></li>
              <li><a href="#">My Cart</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Checkout</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4>Information</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Shipping &amp; Payments</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Refund &amp; Returns</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Visit Our Store</h4>
            <p><strong>Address</strong><br />123 Silk Street, R S Puram,<br />Coimbatore – 641002</p>
            <p><strong>Phone</strong><br />+91 98765 43210</p>
            <p><strong>WhatsApp</strong><br />+91 90123 45678</p>
            <p><strong>Email</strong><br />info@fashionworld.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Fashion World. All rights reserved.</span>
          <span>Crafted with love for tradition</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
