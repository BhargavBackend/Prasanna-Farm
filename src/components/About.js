import React from "react";
import './Aboust.css'



const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Discover who we are and what we stand for.</p>
      </div>

      {/* Mission Section */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver high-quality products while promoting sustainability and innovation. 
          We are committed to creating a positive impact on our community and customers.
        </p>
      </section>

      {/* Values Section */}
      <section className="about-section">
        <h2>Our Values</h2>
        <div className="values-container">
          <div className="value-box">
            <img src="https://via.placeholder.com/100" alt="Quality" />
            <h3>Quality</h3>
            <p>We strive to offer only the best products and services.</p>
          </div>
          <div className="value-box">
            <img src="https://via.placeholder.com/100" alt="Innovation" />
            <h3>Innovation</h3>
            <p>Embracing technology and creativity to improve our offerings.</p>
          </div>
          <div className="value-box">
            <img src="https://via.placeholder.com/100" alt="Sustainability" />
            <h3>Sustainability</h3>
            <p>Committed to eco-friendly practices and responsible sourcing.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section">
        <h2>Meet Our Team</h2>
        <p>Behind every great product is a team of passionate individuals.</p>
        <div className="team-container">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <h4>John Doe</h4>
            <p>CEO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h4>Jane Smith</h4>
            <p>CTO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" />
            <h4>Emily Brown</h4>
            <p>Marketing Head</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
