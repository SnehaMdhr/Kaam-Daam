import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './service.css';

const Service = () => {
  return (
    <div>
      <Header />
      <div className="services-wrapper">

        <div className="services-container">

          {/* Left: Companies */}
          <div className="service-column">
            <h3 className="service-label">Services for Companies</h3>
            <div className="service-box">
              <div className="service-item">
                <span className="icon">👥</span>
                <strong>Access Talented Students</strong>
              </div>
              <div className="service-item">
                <span className="icon">💲</span>
                <strong>Affordable Talent Solutions</strong>
              </div>
              <div className="service-item">
                <span className="icon">📋</span>
                <strong>Support for Short-Term Projects</strong>
              </div>
              <button className="btn-primary">Company Portal</button>
            </div>
          </div>

          {/* Middle: Students */}
          <div className="service-column">
            <h3 className="service-label">Services for Students</h3>
            <div className="service-box">
              <div className="service-item">
                <span className="icon">📁</span>
                <strong>Gain Experience</strong>
              </div>
              <div className="service-item">
                <span className="icon">🖼️</span>
                <strong>Build Portfolios</strong>
              </div>
              <div className="service-item">
                <span className="icon">💰</span>
                <strong>Earn Income</strong>
              </div>
              <div className="service-item">
                <span className="icon">⏰</span>
                <strong>Flexible Work</strong>
              </div>
              <button className="btn-primary">Student Portal</button>
            </div>
          </div>

          {/* Right: Advertising */}
          <div className="service-column">
            <h3 className="service-label">Advertising Opportunities</h3>
            <div className="service-box">
              <div className="service-item">
                <span className="icon">🎯</span>
                <strong>Targeted Reach</strong>
              </div>
              <div className="service-item">
                <span className="icon">👁️</span>
                <strong>Increased Brand Visibility</strong>
              </div>
              <div className="service-item">
                <span className="icon">📈</span>
                <strong>Performance Tracking</strong>
              </div>
              <button className="btn-primary">Advertise With Us</button>
            </div>
          </div>
        </div>

        <p className="footer-text">
          For advertising inquiries, please contact us or visit our Contact Us page.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
