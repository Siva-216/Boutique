import { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="container">
        <h2>Don't Miss Our Latest Collections</h2>
        <p>Be the first to see new arrivals, exclusive offers &amp; much more</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); setSubscribed(false); }}
          />
          <button type="submit">{subscribed ? 'Subscribed!' : 'Subscribe'}</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
