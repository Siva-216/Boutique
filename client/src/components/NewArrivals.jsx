import { newArrivals } from '../data/products';
import SectionHeader from './SectionHeader';
import ProductCarousel from './ProductCarousel';

const NewArrivals = () => {
  return (
    <section className="section" style={{ background: 'var(--bg-cream)' }} id="new-arrivals">
      <div className="container">
        <SectionHeader
          label="Fresh Arrivals"
          title="New Arrivals"
          subtitle="Celebrate tradition with the newest touch of silk"
          ornament="✦"
        />
        <ProductCarousel products={newArrivals} />
      </div>
    </section>
  );
};

export default NewArrivals;
