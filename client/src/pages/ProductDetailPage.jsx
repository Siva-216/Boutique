import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { FiArrowLeft, FiHeart, FiShoppingBag, FiInfo } from 'react-icons/fi';
import './ProductDetailPage.css';

const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

const ProductDetailPage = ({ wishlist, onAddToCart, onToggleWishlist }) => {
  const { productId } = useParams();
  const prodId = parseInt(productId, 10);

  const product = products.find((p) => p.id === prodId);
  const category = product ? categories.find((c) => c.id === product.categoryId) : null;
  
  // Find related products from same category, excluding current product
  const relatedProducts = product
    ? products.filter((p) => p.categoryId === product.categoryId && p.id !== prodId).slice(0, 4)
    : [];

  const [cartMessage, setCartMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(product ? (product.categoryId === 1 ? 'unstitched' : 'M') : 'M');

  // Check if liked globally
  const isLiked = product ? wishlist.some((p) => p.id === product.id) : false;

  // Scroll to top on load/change and reset search/filters
  useEffect(() => {
    window.scrollTo(0, 0);
    setCartMessage('');
    if (product) {
      setSelectedOption(product.categoryId === 1 ? 'unstitched' : 'M');
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="product-error-page container">
        <h2>Product Not Found</h2>
        <p>The design you are looking for is unavailable.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  // Generate unique descriptions dynamically based on category
  const getProductDescription = (name) => {
    if (product.categoryId === 1) {
      return `This exquisite ${name} is handloom woven by master artisans, showcasing premium threads, elegant borders, and classical South Indian motifs. Perfect for weddings, festivals, and traditional family occasions, it offers a luxurious drape with lightweight breathability.`;
    }
    if (product.categoryId === 5) {
      return `A custom-fit ${name} designed to complement your premium sarees. Crafted from rich raw silk fabric and adorned with detailed hand-embellished beadwork, maggam work, and unique neck patterns for a spectacular festive look.`;
    }
    if (product.categoryId === 3) {
      return `Celebrate special moments in this stunning ${name}. Reflecting classic South Indian minimalism combined with opulent borders, this half-saree/lehenga offers a comfortable fit with elegant dual-tone hues, perfect for traditional functions & college events.`;
    }
    return `Add timeless elegance to your wardrobe with this premium ${name}. Made with high-quality fabrics, intricate threadwork details, and a modern fusion fit that transitions beautifully from casual gatherings to formal celebrations.`;
  };

  const handleAddToCart = () => {
    onAddToCart(product, 1, selectedOption);
    setCartMessage('Added to cart successfully!');
    setTimeout(() => setCartMessage(''), 3000);
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb navigation */}
      <div className="detail-breadcrumbs">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          {category && <Link to={`/category/${category.id}`}>{category.name}</Link>}
          <span>/</span>
          <span className="active-breadcrumb">{product.name}</span>
        </div>
      </div>

      {/* Main product detail card */}
      <div className="container section">
        <div className="product-details-grid">
          {/* Left Column: Image */}
          <div className="product-detail-image-area">
            <div className="detail-image-frame">
              <img src={product.image} alt={product.name} />
              {product.badge && (
                <div className={`detail-badge ${product.badgeType}`}>
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="product-detail-info-area">
            {category && <span className="detail-category-label">{category.tagline}</span>}
            <h1 className="detail-product-name">{product.name}</h1>
            
            <div className="detail-price-box">
              {product.originalPrice && (
                <del className="detail-original-price">{formatPrice(product.originalPrice)}</del>
              )}
              <span className="detail-current-price">{formatPrice(product.price)}</span>
            </div>

            <p className="detail-description">{getProductDescription(product.name)}</p>

            {/* Sizing & Tailoring Customization */}
            <div className="detail-options-container">
              {product.categoryId === 1 ? (
                <div className="option-group">
                  <span className="option-title">Blouse Customization:</span>
                  <div className="option-buttons">
                    <button 
                      className={`option-btn ${selectedOption === 'unstitched' ? 'active' : ''}`}
                      onClick={() => setSelectedOption('unstitched')}
                    >
                      Unstitched Blouse Piece
                    </button>
                    <button 
                      className={`option-btn ${selectedOption === 'custom' ? 'active' : ''}`}
                      onClick={() => setSelectedOption('custom')}
                    >
                      Custom Maggam Stitching (+₹1,500)
                    </button>
                  </div>
                  <div className="option-info-text">
                    * Length: 5.5m saree + 80cm blouse. Custom maggam work takes 5-7 additional days.
                  </div>
                </div>
              ) : (
                <div className="option-group">
                  <span className="option-title">Select Size / Fit:</span>
                  <div className="option-buttons size-buttons">
                    {['S', 'M', 'L', 'XL', 'Custom tailoring'].map((size) => (
                      <button
                        key={size}
                        className={`option-btn ${selectedOption === size ? 'active' : ''}`}
                        onClick={() => setSelectedOption(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="option-info-text">
                    * Choose &apos;Custom tailoring&apos; for custom measurements. Our design team will call you to finalize.
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="detail-actions-row">
              <button 
                onClick={handleAddToCart} 
                className="btn-primary add-to-cart-btn"
                disabled={product.badgeType === 'sold'}
              >
                <FiShoppingBag /> {product.badgeType === 'sold' ? 'Sold Out' : 'Add to Cart'}
              </button>
              
              <button 
                onClick={() => onToggleWishlist(product)} 
                className={`like-btn ${isLiked ? 'liked' : ''}`}
                aria-label="Add to Wishlist"
              >
                <FiHeart />
              </button>
            </div>

            {cartMessage && <div className="cart-feedback-alert">{cartMessage}</div>}

            <div className="detail-shipping-notice">
              <FiInfo />
              <span>Complimentary shipping in Tamil Nadu & across India on orders above ₹5,000. Custom tailoring/blouse fitting requests accepted.</span>
            </div>
          </div>
        </div>

        {/* Suggestion / Related products section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="related-section-header">
              <h2>You May Also Like</h2>
              <p>Hand-picked additions from our {category?.name} collection</p>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
