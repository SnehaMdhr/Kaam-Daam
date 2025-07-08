import React from "react";
import "./contact.css";
import Header from "../components/header";
import Footer from "../components/footer";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Form submitted!");
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1>Contact Us</h1>
        <p className="subtitle">
          We're here to help! Reach out with any questions or feedback you have.
        </p>

        <div className="contact-wrapper">
          {/* Contact Form */}
          <div className="contact-form">
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" />

              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="Enter your email" />

              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="Enter the subject" />

              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Type your message here..." />

              <button type="submit">Submit</button>
            </form>
          </div>

          {/* Other Ways to Reach Us */}
          <div className="contact-info">
            <h2>Other Ways to Reach Us</h2>

            <div className="info-block">
              <div className="icon-box">✉️</div>
              <div>
                <strong>Email</strong>
                <br />
                <span>support@kaamdaam.com</span>
              </div>
            </div>

            <div className="info-block">
              <div className="icon-box">#</div>
              <div>
                <strong>Social Media</strong>
                <br />
                <span>Follow us on social media for updates and news.</span>
              </div>
            </div>

            <div className="social-links">
              <div>🐦<br />Twitter</div>
              <div>📷<br />Instagram</div>
              <div>📘<br />Facebook</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
