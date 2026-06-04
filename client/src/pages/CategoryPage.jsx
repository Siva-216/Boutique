import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { FiArrowLeft, FiPhoneCall, FiSearch } from 'react-icons/fi';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const catId = parseInt(categoryId, 10);
  
  const category = categories.find((c) => c.id === catId);
  const categoryProducts = products.filter((p) => p.categoryId === catId);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [badgeFilter, setBadgeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Scroll to top on page load and reset search/filters
  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchQuery('');
    setPriceFilter('all');
    setBadgeFilter('all');
    setSortBy('default');
  }, [categoryId]);

  if (!category) {
    return (
      <div className="category-error-page container">
        <h2>Category Not Found</h2>
        <p>The collection you are looking for does not exist.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  // Filter logic
  const filteredProducts = categoryProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter === 'under-3000') {
      matchesPrice = product.price < 3000;
    } else if (priceFilter === '3000-8000') {
      matchesPrice = product.price >= 3000 && product.price <= 8000;
    } else if (priceFilter === 'above-8000') {
      matchesPrice = product.price > 8000;
    }

    let matchesBadge = true;
    if (badgeFilter === 'new') {
      matchesBadge = product.badgeType === 'new';
    } else if (badgeFilter === 'sale') {
      matchesBadge = product.badgeType === 'sale';
    } else if (badgeFilter === 'available') {
      matchesBadge = product.badgeType !== 'sold';
    }

    return matchesSearch && matchesPrice && matchesBadge;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Grid Layout State (number of columns)
  const [columns, setColumns] = useState(3);

  // Check if filters are active
  const isFiltered = searchQuery !== '' || priceFilter !== 'all' || badgeFilter !== 'all' || sortBy !== 'default';

  const handleClearFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setBadgeFilter('all');
    setSortBy('default');
  };

  return (
    <div className="category-page">
      {/* Category Hero Banner */}
      <div className="category-hero" style={{ backgroundImage: `linear-gradient(rgba(26, 15, 8, 0.75), rgba(26, 15, 8, 0.75)), url(${category.image})` }}>
        <div className="container category-hero-inner">
          <Link to="/" className="back-link">
            <FiArrowLeft /> Back to Home
          </Link>
          <span className="cat-tagline">{category.tagline}</span>
          <h1 className="cat-title">{category.name}</h1>
          <p className="cat-description">{category.description}</p>
        </div>
      </div>

      <div className="container section">
        <div className="category-layout">
          {/* Sidebar / Info */}
          <aside className="category-sidebar">
            <div className="sidebar-card">
              <h3>Boutique Specialization</h3>
              <p>Every piece in our <strong>{category.name}</strong> collection is curated with premium craftsmanship, authentic handloom materials, and custom-tailored fitting options.</p>
              
              <div className="sidebar-contact">
                <h4>Interested in ordering?</h4>
                <p>Contact our design consultants on WhatsApp or Call for custom sizes, fabric details, and color variants.</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="whatsapp-cta-btn">
                  <FiPhoneCall /> Chat / Order via WhatsApp
                </a>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="category-products-area">
            {/* Search, Filter & Sort Controls */}
            <div className="filter-controls-container">
              <div className="search-bar-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by design name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="select-filters-wrapper">
                <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="filter-select" aria-label="Price Filter">
                  <option value="all">All Prices</option>
                  <option value="under-3000">Under ₹3,000</option>
                  <option value="3000-8000">₹3,000 - ₹8,000</option>
                  <option value="above-8000">Above ₹8,000</option>
                </select>

                <select value={badgeFilter} onChange={(e) => setBadgeFilter(e.target.value)} className="filter-select" aria-label="Status Filter">
                  <option value="all">All Status</option>
                  <option value="new">New Arrivals</option>
                  <option value="sale">On Sale</option>
                  <option value="available">In Stock Only</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select sorting-select" aria-label="Sort Order">
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="alphabetical">Name: A to Z</option>
                </select>

                {isFiltered && (
                  <button onClick={handleClearFilters} className="clear-filters-btn">
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="products-count-header">
              <div>Showing <span>{sortedProducts.length}</span> of {categoryProducts.length} exquisite designs</div>
              
              <div className="grid-layout-selector">
                <button 
                  className={`layout-btn ${columns === 2 ? 'active' : ''}`} 
                  onClick={() => setColumns(2)}
                  aria-label="2 columns"
                >
                  <div className="layout-grid-2">
                    <span></span><span></span>
                    <span></span><span></span>
                  </div>
                </button>
                <button 
                  className={`layout-btn ${columns === 3 ? 'active' : ''}`} 
                  onClick={() => setColumns(3)}
                  aria-label="3 columns"
                >
                  <div className="layout-grid-3">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                  </div>
                </button>
                <button 
                  className={`layout-btn ${columns === 4 ? 'active' : ''}`} 
                  onClick={() => setColumns(4)}
                  aria-label="4 columns"
                >
                  <div className="layout-grid-4">
                    <span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span>
                  </div>
                </button>
              </div>
            </div>
            
            {sortedProducts.length > 0 ? (
              <div className={`category-products-grid cols-${columns}`}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="no-products-message">
                <p>No designs match your selected search or filter criteria. Try clearing search or resetting options.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
