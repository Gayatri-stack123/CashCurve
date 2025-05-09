import React from "react";
import { FaMoneyBillWave, FaSignInAlt, FaList, FaChartPie, FaQuoteLeft } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./HeroSection.css"; // make sure this CSS file exists or adjust as necessary

const HomePage = () => {
  return (
    <div className="hero-section">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>Track Your Expenses Effortlessly</h1>
        <p>Manage your finances with a modern solution designed for you.</p>
        <div className="features">
          <Feature icon={FaMoneyBillWave} text="Efficient Tracking" />
          <Feature icon={FaFilter} text="Transactions Filtering" />
          <Feature icon={IoIosStats} text="Insightful Reports" />
        </div>
        <Link to="/signup">
          <button className="btn">Get Started</button>
        </Link>
      </div>

      {/* How it Works */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <Step icon={FaSignInAlt} color="blue" title="Sign Up" description="Register and start managing your expenses in a minute." />
          <Step icon={FaList} color="green" title="Add Transactions" description="Quickly add income and expenses to your account." />
          <Step icon={FaChartPie} color="yellow" title="View Reports" description="See insightful reports & graphs of your finances." />
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <Testimonial quote="This app has revolutionized the way I track my expenses. Highly intuitive and user-friendly." author="Jane Doe" />
          <Testimonial quote="Finally, a hassle-free way to manage my finances. The insights feature is a game changer!" author="John Smith" />
        </div>
      </div>

      {/* Call To Action */}
      <div className="cta">
        <h2>Ready to Take Control of Your Finances?</h2>
        <p>Join us now and start managing your expenses like a pro!</p>
        <Link to="/signup">
          <button className="btn">Sign Up For Free</button>
        </Link>
      </div>
    </div>
  );
};

// Feature Component
const Feature = ({ icon: Icon, text }) => (
  <div className="feature">
    <Icon />
    <p>{text}</p>
  </div>
);

// Step Component
const Step = ({ icon: Icon, color, title, description }) => (
  <div className="step">
    <div className={`icon ${color}`}>
      <Icon />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Testimonial Component
const Testimonial = ({ quote, author }) => (
  <div className="card">
    <FaQuoteLeft />
    <p>"{quote}"</p>
    <p className="author">- {author}</p>
  </div>
);

export default HomePage;
