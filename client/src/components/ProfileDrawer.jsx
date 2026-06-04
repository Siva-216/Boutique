import { FiX, FiUser, FiMapPin, FiGift, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import './ProfileDrawer.css';

const ProfileDrawer = ({ isOpen, onClose }) => {
  // Mock profile data for boutique client
  const profile = {
    name: 'Priya Lakshmi',
    email: 'priya.lakshmi@example.com',
    phone: '+91 98765 43210',
    memberSince: 'March 2024',
    tier: 'Gold Patron',
    points: 1250,
    address: '12, Gandhipuram Street, R S Puram, Coimbatore - 641002',
    orders: [
      { id: 'FW-4092', date: '24 May 2026', total: '₹8,350', status: 'Delivered', items: 'Pure Soft Silk Saree' },
      { id: 'FW-3891', date: '10 Apr 2026', total: '₹3,195', status: 'Delivered', items: 'Navy Chanderi Saree' }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content profile-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>My Account</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close profile"><FiX /></button>
        </div>

        <div className="profile-drawer-scroll">
          {/* User Info Card */}
          <div className="profile-info-section">
            <div className="profile-avatar">
              <FiUser />
            </div>
            <h4 className="profile-user-name">{profile.name}</h4>
            <span className="profile-user-detail">{profile.email}</span>
            <span className="profile-user-detail">{profile.phone}</span>
            <span className="profile-tier-badge">{profile.tier}</span>
          </div>

          {/* Loyalty Points Section */}
          <div className="profile-rewards-card">
            <div className="rewards-icon"><FiGift /></div>
            <div className="rewards-text">
              <span className="rewards-title">Loyalty Points Balance</span>
              <strong className="rewards-value">{profile.points} Points</strong>
              <span className="rewards-sub">Redeemable on your next order</span>
            </div>
          </div>

          {/* Saved Address */}
          <div className="profile-section-card">
            <div className="card-header-icon"><FiMapPin /></div>
            <div className="card-body-text">
              <h5>Default Delivery Address</h5>
              <p>{profile.address}</p>
            </div>
          </div>

          {/* Order History */}
          <div className="profile-section-card orders-section">
            <div className="card-header-icon"><FiShoppingBag /></div>
            <div className="card-body-text">
              <h5>Recent Orders</h5>
              
              <div className="order-history-list">
                {profile.orders.map((order) => (
                  <div className="order-history-item" key={order.id}>
                    <div className="order-meta-row">
                      <span className="order-number">{order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <div className="order-details-row">
                      <span className="order-items-summary">{order.items}</span>
                      <span className="order-total">{order.total}</span>
                    </div>
                    <span className="order-status-badge">{order.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logout button */}
          <button className="logout-btn" onClick={onClose}>
            <FiLogOut /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
