import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import SectionHeader from './SectionHeader';
import './Categories.css';

const Categories = () => {
  const [activeTab, setActiveTab] = useState(0);
  const selectedCategory = categories[activeTab];

  return (
    <section className="section categories" id="collections">
      <div className="container">
        <SectionHeader
          label="Our Collections"
          title="Explore Our Boutique"
          subtitle="Choose a category to discover our popular regional varieties and custom fits"
          ornament="❋"
        />

        {/* Tab Selection */}
        <div className="collection-tabs">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              className={`collection-tab-btn ${index === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-number">0{index + 1}</span>
              <span className="tab-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Content */}
        <div className="category-details-container">
          <div className="category-details-text">
            <span className="category-tagline">{selectedCategory.tagline}</span>
            <h3 className="category-name">{selectedCategory.name}</h3>
            <p className="category-desc">{selectedCategory.description}</p>
            
            <div className="varieties-section">
              <h4>Popular Varieties & Details:</h4>
              <ul className="varieties-list">
                {selectedCategory.varieties.map((varItem, idx) => (
                  <li key={idx} className="variety-item">
                    <span className="variety-bullet">✦</span>
                    <div className="variety-info">
                      <span className="variety-name">{varItem.name}</span>
                      <span className="variety-desc">{varItem.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Link to={`/category/${selectedCategory.id}`} className="btn-primary category-shop-btn" style={{ marginTop: '32px', display: 'inline-block', textAlign: 'center' }}>
              Shop {selectedCategory.name}
            </Link>
          </div>

          <div className="category-details-image">
            <div className="image-frame">
              <img src={selectedCategory.image} alt={selectedCategory.name} />
              <div className="image-overlay-border"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
