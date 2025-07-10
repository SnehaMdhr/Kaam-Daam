import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import './help.css' 
import { Link } from 'react-router-dom';
const help = () => {
  return (
    <div>
      <Header />
       <div className="help-container">
      <h2>How can we help you?</h2>

      <div className="search-bar">
        <input type="text" placeholder="Search for answers..." />
      </div>

      <h3>Frequently Asked Questions</h3>

      <div className="faq-section">
        <details open>
          <summary>Getting Started</summary>
          <p>
            To get started, create an account, complete your profile, and browse available jobs.
            You can apply for jobs that match your skills and interests.
          </p>
        </details>

        <details>
          <summary>Job Applications</summary>
          <p>
            Learn how to apply for jobs, track your applications, and communicate with clients.
          </p>
        </details>

        <details>
          <summary>Payments</summary>
          <p>
            Understand payment methods, transaction timelines, and how to withdraw your earnings.
          </p>
        </details>

        <details>
          <summary>Account Settings</summary>
          <p>
            Manage your account info, change your password, and set up notifications.
          </p>
        </details>
      </div>

      <div className="contact-section">
        <h3>Contact Us</h3>
        <p>
          If you need further assistance, please contact us through the following methods:
        </p>

        <div className="contact-methods">
          <div className="contact-card">
            <span className="icon">📧</span>
            <div>
              <strong>Email Support</strong>
              <p>support@kaamdaam.com</p>
            </div>
          </div>

          <div className="contact-card">
            <span className="icon">💬</span>
            <div>
               <Link to="/contact">
      <h3>Contact Form</h3>
      <p>Contact Us</p>
    </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

        <Footer />
    </div>
  )
}

export default help
