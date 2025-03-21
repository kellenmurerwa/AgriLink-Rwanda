import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Wallpaper from '../assets/Wallpaper.jpg'; 
import LandPage from '../assets/LandPage.jpg'



const Home = () => {
  return (
    <div className="home-container">
      
      <section className="hero-section">
      <div className="hero-image">
          <img src={Wallpaper} alt="Landscape" />
        </div>
        <div className="hero-content">
          <h1>Connecting Rwanda's Agricultural Community</h1>
          <p>Make data-driven farming decisions and connect directly with buyers through our unified platform</p>
          <div className="hero-cta">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Empowering Rwanda's Agricultural Sector</h2>
        <div className="features-grid">
          <div className="feature-card">
            {/* <img src={marketplaceIcon} alt="Marketplace icon" /> */}
            <h3>Market Integration</h3>
            <p>Connect directly with buyers and make crop selections based on market demand</p>
          </div>
          <div className="feature-card">
            {/* <img src={dataIcon} alt="Data icon" /> */}
            <h3>Data-Driven Decisions</h3>
            <p>Access environmental data and agricultural insights across all districts</p>
          </div>
          <div className="feature-card">
            {/* <img src={communityIcon} alt="Community icon" /> */}
            <h3>Community Collaboration</h3>
            <p>Share knowledge and resources with farmers across Rwanda</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How AgriLink Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register on the Platform</h3>
            <p>Create your account as a farmer, buyer, or agricultural officer</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Access District Data</h3>
            <p>View agricultural information specific to your region</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connect with Buyers</h3>
            <p>List your produce or find farmers selling what you need</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Make Informed Decisions</h3>
            <p>Use environmental data to optimize your crop selection</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="testimonial-content">
          <h2>Success Stories</h2>
          <div className="testimonial">
            <p>"AgriLink helped me connect with buyers from Kigali, increasing my income by 40% this season."</p>
            <div className="testimonial-author">
              <p><strong>Jeanne Mutoni</strong></p>
              <p>Farmer from Musanze District</p>
            </div>
          </div>
        </div>
        
      </section>

      {/* Call to Action Section */}
      {/* <section className="cta-section">
        <h2>Ready to transform your agricultural practices?</h2>
        <p>Join thousands of farmers across Rwanda who are already benefiting from AgriLink</p>
        <Link to="/register" className="btn btn-primary">Register Now</Link>
      </section> */}
    </div>
  );
};

export default Home;