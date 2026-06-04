import { useState } from 'react';
import { occasionTabs, occasionProducts } from '../data/occasions';
import SectionHeader from './SectionHeader';
import './Occasions.css';

const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

const Occasions = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="section occasion" id="occasion">
      <div className="container">
        <SectionHeader
          label="Curated For You"
          title="Shop by Occasion"
          subtitle="From simple drapes to celebration silks"
          ornament="❖"
        />
        <div className="occ-tabs">
          {occasionTabs.map((tab, index) => (
            <button
              key={tab}
              className={`occ-tab${index === activeTab ? ' active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="occ-grid">
          {occasionProducts.map((product) => (
            <div className="occ-card" key={product.id}>
              <div className="occ-card-img">
                <span>{product.icon}</span>
              </div>
              <div className="occ-card-info">
                <h4>{product.name}</h4>
                <span>
                  {product.originalPrice && (
                    <del style={{ opacity: 0.6 }}>{formatPrice(product.originalPrice)}</del>
                  )}{' '}
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Occasions;
