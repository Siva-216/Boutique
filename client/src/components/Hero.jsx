import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-pattern"></div>
      <div className="hero-inner">
        <div className="hero-text anim-fade-up">
          <div className="hero-tagline">Established 1985 — Coimbatore</div>
          <h1 className="hero-title">
            Timeless Silks,<br />
            <em>Woven</em> by Tradition
          </h1>
          <p className="hero-desc">
            Discover handloom silk sarees crafted with four decades of heritage — from regal
            Kanchivarams to delicate Chanderis, each drape tells a story of timeless artistry.
          </p>
          <div className="hero-buttons">
            <a href="#collections" className="btn-primary">Explore Collections</a>
            <a href="#new-arrivals" className="btn-outline">New Arrivals</a>
          </div>
        </div>
        <div className="hero-image anim-fade-up anim-delay-2">
          <div className="hero-img-frame">
            <img src="/images/hero_saree.png" alt="Fashion World Boutique South Indian Silk Saree" />
          </div>
          <div className="hero-badge">
            Pure Handloom<br />
            <em style={{ fontStyle: 'italic', fontSize: '0.85em', opacity: 0.8 }}>
              Silk Mark Certified
            </em>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
