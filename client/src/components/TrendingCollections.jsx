import { trendingProducts } from '../data/products';
import SectionHeader from './SectionHeader';
import ProductCarousel from './ProductCarousel';

const TrendingCollections = () => {
  return (
    <section className="section" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <SectionHeader
          label="Trending Now"
          title="Trending Collections"
          subtitle="Trendy designs, timeless tradition"
          ornament="❋"
        />
        <ProductCarousel products={trendingProducts} />
      </div>
    </section>
  );
};

export default TrendingCollections;
