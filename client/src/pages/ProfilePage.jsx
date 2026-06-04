import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, 
  FiMapPin, 
  FiGift, 
  FiShoppingBag, 
  FiLogOut, 
  FiArrowLeft, 
  FiEdit2, 
  FiCheckCircle, 
  FiScissors 
} from 'react-icons/fi';
import './ProfilePage.css';

const ProfilePage = () => {
  // Active Tab: 'profile' | 'addresses' | 'measurements' | 'orders'
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Profile data state with localstorage persistence
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('boutique_profile');
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (e) {
        // Fallback to default
      }
    }
    return {
      name: 'Priya Lakshmi',
      email: 'priya.lakshmi@example.com',
      phone: '+91 98765 43210',
      memberSince: 'March 2024',
      tier: 'Gold Patron',
      points: 1250,
      address: '12, Gandhipuram Street, R S Puram, Coimbatore - 641002',
      alternateAddress: 'Plot 4A, Orchid Enclave, Anna Nagar, Chennai - 600040',
      measurements: {
        height: '162',
        bust: '36',
        waist: '30',
        hips: '40',
        shoulder: '14.5',
        sleeveLength: '10.5',
        frontNeckDepth: '7',
        backNeckDepth: '8.5',
        preferredNeck: 'Round Neck'
      }
    };
  });

  const [editForm, setEditForm] = useState({ ...profile });

  useEffect(() => {
    setEditForm({ ...profile });
  }, [profile]);

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMeasurementChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: value
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(editForm);
    localStorage.setItem('boutique_profile', JSON.stringify(editForm));
    setIsEditing(false);
    setSaveMessage('Profile changes saved successfully!');
    setTimeout(() => setSaveMessage(''), 4000);
  };

  // Mock static orders data
  const orders = [
    { 
      id: 'FW-4092', 
      date: '24 May 2026', 
      total: '₹8,350', 
      status: 'Delivered', 
      items: 'Pure Soft Silk Saree', 
      statusColor: '#2e7d32',
      notes: 'Custom blouse stitching & checks complete'
    },
    { 
      id: 'FW-3891', 
      date: '10 Apr 2026', 
      total: '₹3,195', 
      status: 'Delivered', 
      items: 'Navy Chanderi Saree', 
      statusColor: '#2e7d32',
      notes: 'Standard sizing M'
    }
  ];

  return (
    <div className="profile-page">
      {/* Profile Header Hero */}
      <div className="profile-hero">
        <div className="container profile-hero-inner">
          <Link to="/" className="back-link">
            <FiArrowLeft /> Back to Boutique
          </Link>
          <div className="profile-welcome-row">
            <div className="profile-avatar-large">
              <FiUser />
            </div>
            <div className="welcome-text-meta">
              <span className="welcome-greet">Welcome Back,</span>
              <h1 className="welcome-name">{profile.name}</h1>
              <span className="welcome-since">Patron since {profile.memberSince}</span>
            </div>
            <div className="tier-badge-container">
              <span className="tier-tag">{profile.tier}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        {/* Navigation Tabs */}
        <div className="profile-tabs-nav">
          <button 
            className={`tab-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveTab('profile'); setIsEditing(false); }}
          >
            <FiUser /> Personal Details
          </button>
          <button 
            className={`tab-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => { setActiveTab('addresses'); setIsEditing(false); }}
          >
            <FiMapPin /> Saved Addresses
          </button>
          <button 
            className={`tab-nav-btn ${activeTab === 'measurements' ? 'active' : ''}`}
            onClick={() => { setActiveTab('measurements'); setIsEditing(false); }}
          >
            <FiScissors /> Stitching Measurements
          </button>
          <button 
            className={`tab-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => { setActiveTab('orders'); setIsEditing(false); }}
          >
            <FiShoppingBag /> Order History
          </button>
        </div>

        {saveMessage && (
          <div className="save-success-alert">
            <FiCheckCircle /> {saveMessage}
          </div>
        )}

        <div className="profile-dashboard-layout">
          {/* Left Column: Loyalty points card & Quick Actions */}
          <div className="dashboard-sidebar-column">
            {/* Loyalty points card */}
            <div className="loyalty-card">
              <div className="loyalty-icon-circle">
                <FiGift />
              </div>
              <div className="loyalty-details">
                <span className="loyalty-label">Boutique Rewards</span>
                <span className="loyalty-points">{profile.points} Points</span>
                <span className="loyalty-redeem-tip">Redeemable on next custom order</span>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="profile-info-card quick-summary-card">
              <h3>Boutique Care</h3>
              <div className="care-meta">
                <p>Have custom design requests or need to modify measurements? Contact our Coimbatore design team:</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="care-whatsapp-btn">
                  WhatsApp Design Consultant
                </a>
              </div>
            </div>

            {/* Logout button */}
            <Link to="/" className="profile-logout-btn">
              <FiLogOut /> Log Out Account
            </Link>
          </div>

          {/* Right Column: Dynamic Tab Content */}
          <div className="dashboard-content-column">
            
            {/* TAB: Personal Details */}
            {activeTab === 'profile' && (
              <div className="tab-pane">
                <div className="tab-pane-header">
                  <div>
                    <h2>Personal Information</h2>
                    <p>Manage your login credentials, name, and primary contact details</p>
                  </div>
                  {!isEditing && (
                    <button className="edit-action-btn" onClick={() => setIsEditing(true)}>
                      <FiEdit2 /> Edit details
                    </button>
                  )}
                </div>

                <form onSubmit={handleSave} className="profile-form-container">
                  <div className="form-fields-grid">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={editForm.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)} 
                        disabled={!isEditing} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={editForm.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)} 
                        disabled={!isEditing} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        value={editForm.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)} 
                        disabled={!isEditing} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Patron Rank</label>
                      <input 
                        type="text" 
                        value={profile.tier} 
                        disabled 
                        className="disabled-field"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions-row">
                      <button type="submit" className="btn-save-profile">Save Changes</button>
                      <button type="button" className="btn-cancel-profile" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* TAB: Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="tab-pane">
                <div className="tab-pane-header">
                  <div>
                    <h2>Saved Addresses</h2>
                    <p>Set and update your primary delivery addresses for fast boutique order dispatch</p>
                  </div>
                  {!isEditing && (
                    <button className="edit-action-btn" onClick={() => setIsEditing(true)}>
                      <FiEdit2 /> Edit Addresses
                    </button>
                  )}
                </div>

                <form onSubmit={handleSave} className="profile-form-container">
                  <div className="form-group full-width-group">
                    <label>Default Shipping Address</label>
                    <textarea 
                      rows="3"
                      value={editForm.address} 
                      onChange={(e) => handleInputChange('address', e.target.value)} 
                      disabled={!isEditing} 
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width-group">
                    <label>Secondary / Alternate Address (Optional)</label>
                    <textarea 
                      rows="3"
                      value={editForm.alternateAddress} 
                      onChange={(e) => handleInputChange('alternateAddress', e.target.value)} 
                      disabled={!isEditing} 
                    />
                  </div>

                  {isEditing && (
                    <div className="form-actions-row">
                      <button type="submit" className="btn-save-profile">Save Addresses</button>
                      <button type="button" className="btn-cancel-profile" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* TAB: Stitching Measurements */}
            {activeTab === 'measurements' && (
              <div className="tab-pane">
                <div className="tab-pane-header">
                  <div>
                    <h2>My Stitching Size Profile</h2>
                    <p>Save your customized tailoring measurements. Choose &quot;Custom tailoring&quot; at checkout to auto-apply these specifications.</p>
                  </div>
                  {!isEditing && (
                    <button className="edit-action-btn" onClick={() => setIsEditing(true)}>
                      <FiEdit2 /> Edit Measurements
                    </button>
                  )}
                </div>

                <form onSubmit={handleSave} className="profile-form-container">
                  <div className="measurements-grid-inputs">
                    <div className="form-group">
                      <label>Height (cm)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 165"
                        value={editForm.measurements.height} 
                        onChange={(e) => handleMeasurementChange('height', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Bust (inches)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 36"
                        value={editForm.measurements.bust} 
                        onChange={(e) => handleMeasurementChange('bust', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Waist (inches)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 30"
                        value={editForm.measurements.waist} 
                        onChange={(e) => handleMeasurementChange('waist', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Hips (inches)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 40"
                        value={editForm.measurements.hips} 
                        onChange={(e) => handleMeasurementChange('hips', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Shoulder Width (inches)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 14.5"
                        value={editForm.measurements.shoulder} 
                        onChange={(e) => handleMeasurementChange('shoulder', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Sleeve Length (inches)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 10"
                        value={editForm.measurements.sleeveLength} 
                        onChange={(e) => handleMeasurementChange('sleeveLength', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Front Neck Depth (inches)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 6.5"
                        value={editForm.measurements.frontNeckDepth} 
                        onChange={(e) => handleMeasurementChange('frontNeckDepth', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Back Neck Depth (inches)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 8"
                        value={editForm.measurements.backNeckDepth} 
                        onChange={(e) => handleMeasurementChange('backNeckDepth', e.target.value)} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Preferred Neckline Cut</label>
                      <select 
                        value={editForm.measurements.preferredNeck} 
                        onChange={(e) => handleMeasurementChange('preferredNeck', e.target.value)} 
                        disabled={!isEditing}
                      >
                        <option value="Round Neck">Round Neck</option>
                        <option value="U Neck">U Neck</option>
                        <option value="Square Neck">Square Neck</option>
                        <option value="Sweetheart Cut">Sweetheart Cut</option>
                        <option value="Boat Neck">Boat Neck</option>
                        <option value="V Neck">V Neck</option>
                      </select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions-row" style={{ marginTop: '24px' }}>
                      <button type="submit" className="btn-save-profile">Save Measurements</button>
                      <button type="button" className="btn-cancel-profile" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* TAB: Order History */}
            {activeTab === 'orders' && (
              <div className="tab-pane animate-fade-in">
                <div className="orders-header">
                  <h2>My Orders & Tailoring Status</h2>
                  <p>Track your premium handloom Sarees, Lehengas, and custom blouse tailoring projects</p>
                </div>

                <div className="orders-list">
                  {orders.map((order) => (
                    <div className="order-card-item" key={order.id}>
                      <div className="order-card-header">
                        <div>
                          <span className="order-id-label">Order</span>
                          <span className="order-id">{order.id}</span>
                        </div>
                        <span className="order-date-text">Placed: {order.date}</span>
                      </div>
                      
                      <div className="order-card-body">
                        <div className="order-item-desc-row">
                          <span className="order-icon-box">👗</span>
                          <div className="order-details-meta">
                            <span className="order-item-name">{order.items}</span>
                            <span className="order-customization-note">{order.notes}</span>
                          </div>
                        </div>
                        
                        <div className="order-price-summary">
                          <span className="price-label">Total Amount</span>
                          <span className="price-val">{order.total}</span>
                        </div>
                      </div>

                      <div className="order-card-footer">
                        <span className="order-status-indicator" style={{ color: order.statusColor }}>
                          ● {order.status}
                        </span>
                        <button className="track-order-btn" onClick={() => alert(`Tracking details for order ${order.id} sent to registered WhatsApp.`)}>
                          Track Order Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

