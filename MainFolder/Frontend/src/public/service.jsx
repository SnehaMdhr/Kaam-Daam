import React from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'
import './service.css'

const service = () => {
  return (
    <div>
      <Header />
      <div className="services-wrapper">
      <h3 className="section-title">Services for Students</h3>
      <div className="services-container">
        
        <div className="service-box">
          <h4 className="service-heading">Services for Companies</h4>
          <div className="service-item">
            <span className="icon">👥</span>
            <strong>Access Talented Students</strong>
          </div>
          <div className="service-item">
            <span className="icon">$</span>
            <strong>Affordable Talent Solutions</strong>
          </div>
          <div className="service-item">
            <span className="icon">📋</span>
            <strong>Support for Short-Term Projects</strong>
          </div>
          <button className="btn-primary">Company Portal</button>
        </div>

        <div className="service-box center-box">
          <h4 className="service-heading">&nbsp;</h4> {/* blank to align */}
          <div className="service-item">
            <span className="icon">📁</span>
            <strong>Gain Experience</strong>
          </div>
          <div className="service-item">
            <span className="icon">🖼️</span>
            <strong>Build Portfolios</strong>
          </div>
          <div className="service-item">
            <span className="icon">$</span>
            <strong>Earn Income</strong>
          </div>
          <div className="service-item">
            <span className="icon">⏰</span>
            <strong>Flexible Work</strong>
          </div>
          <button className="btn-primary">Student Portal</button>
        </div>

        <div className="service-box">
          <h4 className="service-heading">Advertising Opportunities</h4>
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

      <p className="footer-text">
        For advertising inquiries, please contact us or visit our Contact Us page.
      </p>
    </div>
      
      <Footer />
    </div>
  )
}

export default service
