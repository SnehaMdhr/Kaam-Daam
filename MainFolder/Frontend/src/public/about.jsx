import React from "react";
import "./about.css";
import Header from "../components/header";
import Footer from "../components/footer";

// Import images from assets folder
import groupImage from "../assets/image/Group 30.png";
import colabImage from "../assets/image/colab 1.png";
import apalaImg from "../assets/image/apala.png";
import anjaliImg from "../assets/image/anjali.png";
import snehaImg from "../assets/image/sneha.png";
import kimtiImg from "../assets/image/kimti.png";

const About = () => {
  return (
    <>
      <Header />
      <div className="hero">
        <section className="about-section">
          {/* Hero Title */}
          <div className="intro">
            <div className="text-block">
              <p className="tag">About Us</p>
              <h1>
                STARTED IN 2025
                <br />
                <span className="highlight">KAAM DAAM</span>
              </h1>
              <div className="line">
              <h3>Our Story</h3></div>
              <p className="desc">
                KaamDaam was born from a simple yet powerful idea: to provide IT students with a launchpad for their careers. We recognized the challenge students face in gaining practical experience and building a portfolio while still in school. At the same time, we saw the need for businesses to access fresh, innovative talent. KaamDaam was created to solve this, offering a platform where students can apply their skills to real projects and companies can tap into a pool of motivated, skilled individuals.
              </p>
            </div>
            <div className="image-block">
              <img src={groupImage} alt="students working" />
            </div>
          </div>
          </section>
          </div>
 <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-container">
          <div className="value-card">
            <h2>👥 Community</h2>
            <p>
              We foster a supportive community where students and businesses can
              connect, learn, and grow together.
            </p>
          <br></br>
          <br></br>
          <br></br>
            <h2>🛡️ Integrity</h2>
            <p>
              We are committed to ethical practices, transparency, and
              maintaining the highest standards of professionalism.
            </p>
          </div>

          <div className="center-image">
            <img src={colabImage} alt="Teamwork Hands" />
            
          </div>

          
          <div className="value-card">
            <h2>📈 Continuous Growth</h2>
            <p>
              We are dedicated to fostering learning and development for both
              students and companies.
            </p>
            <br></br>
            <br></br>
            <br></br>
            <h2>🤝 Collaboration</h2>
            <p>
              We believe in the power of teamwork and encourage open
              communication and mutual respect.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          {/* Students Side */}
          <div className="benefits-box student">
            <h3>Benefits for Students</h3>
            <div className="benefit-card light">
              <h4>🎓 Real-World Experience</h4>
              <p>
                Gain practical experience by working on real projects for real
                companies.
              </p>
            </div>
            <div className="benefit-card light">
              <h4>📁 Portfolio Building</h4>
              <p>
                Build a professional portfolio showcasing your skills and
                accomplishments.
              </p>
            </div>
            <div className="benefit-card light">
              <h4>🚀 Career Advancement</h4>
              <p>
                Enhance your resume and increase your chances of landing your
                dream job after graduation.
              </p>
            </div>
          </div>

          {/* Companies Side */}
          <div className="benefits-box company">
            <h3>Benefits for Companies</h3>
            <div className="benefit-card dark">
              <h4>👨‍💻 Access to Talent</h4>
              <p>
                Tap into a pool of skilled and motivated IT students eager to
                contribute.
              </p>
            </div>
            <div className="benefit-card dark">
              <h4>💡 Innovative Solutions</h4>
              <p>
                Benefit from fresh perspectives and innovative ideas from the
                next generation of tech talent.
              </p>
            </div>
            <div className="benefit-card dark">
              <h4>💰 Cost-Effective</h4>
              <p>
                Find cost-effective solutions for your projects without
                compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

          {/* Meet the Team */}
         <section className="team-section section">
          <div className="team-intro">
  <h2>Meet the Team</h2>
  <div className="team-grid">
    <div className="team-member">
      <img src={apalaImg} alt="Apsa Lama" />
      <p>
        <strong>Apsa Lama</strong>
        <br />
        Frontend Developer
      </p>
    </div>
    <div className="team-member">
      <img src={anjaliImg} alt="Kiran Ghimire" />
      <p>
        <strong>Kiran Ghimire</strong>
        <br />
        UI/UX Designer
      </p>
    </div>
    <div className="team-member">
      <img src={snehaImg} alt="Esmita Maharjan" />
      <p>
        <strong>Esmita Maharjan</strong>
        <br />
        Project Manager
      </p>
    </div>
    <div className="team-member">
      <img src={kimtiImg} alt="Saraswati" />
      <p>
        <strong>Saraswati</strong>
        <br />
        Backend Developer
      </p>
    </div>
  </div>
  </div>
</section>

     
      <Footer />
    </>
  );
};

export default About;
