import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import './ProductCarousel.css';

const ProductCarousel = ({ products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="products-scroll" ref={scrollRef}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="scroll-nav">
        <button className="scroll-btn" onClick={() => scroll(-1)} aria-label="Scroll left">
          <FiChevronLeft />
        </button>
        <button className="scroll-btn" onClick={() => scroll(1)} aria-label="Scroll right">
          <FiChevronRight />
        </button>
      </div>
    </>
  );
};

export default ProductCarousel;
