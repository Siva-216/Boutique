import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const revealRef = useScrollReveal();

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid" ref={revealRef}>
          <div className="about-image">
            <img src="/images/party_wear.png" alt="Fashion World Heritage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="about-text">
            <div className="section-label">Our Heritage</div>
            <h2>Four Decades of Silk &amp; Tradition</h2>
            <p>
              Fashion World is a trusted traditional saree house with over 40 years of experience
              in the textile craft. We specialize in premium handloom silk sarees and cotton
              collections, each woven with fine workmanship and timeless design.
            </p>
            <p>
              Our curated collection features pure soft silk sarees, regal Kanchivarams, and
              elegant cotton sarees — designed to suit weddings, festive occasions, and everyday
              wear. Every saree reflects authentic South Indian craftsmanship, ensuring quality,
              durability, and enduring style.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <strong>40+</strong>
                <span>Years of Heritage</span>
              </div>
              <div className="about-stat">
                <strong>5000+</strong>
                <span>Happy Customers</span>
              </div>
              <div className="about-stat">
                <strong>200+</strong>
                <span>Unique Designs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
