// app/page.js
import React from 'react';
import Link from 'next/link';
import './page.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo-container">
          <div className="logo">ExamMaster</div>
          <div className="tagline">Your Path to Success</div>
        </div>
        <nav className="nav">
          <Link href="/pages/exams_list" className="nav-link">Exams</Link>
          <Link href="#" className="nav-link">Features</Link>
          <Link href="#" className="nav-link">About</Link>
          <Link href="#" className="nav-link">Contact</Link>
          <Link href="/pages/exams_list" className="cta-button">Get Started</Link>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Master Your Exams with Confidence</h1>
          <p className="hero-subtitle">Access hundreds of practice tests, track your progress, and achieve your goals with our comprehensive exam platform.</p>
          <div className="hero-buttons">
            <Link href="/pages/exams_list" className="primary-button">Browse Exams</Link>
            <Link href="#" className="secondary-button">How It Works</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder"></div>
        </div>
      </main>

      <section className="features">
        <h2 className="section-title">Why Choose ExamMaster?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Comprehensive Content</h3>
            <p>Access thousands of questions across all major subjects and certification exams.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Analytics</h3>
            <p>Track your performance with detailed reports and personalized recommendations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Timed Practice</h3>
            <p>Simulate real exam conditions with our timed test environment.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Study anywhere, anytime with our responsive platform on all devices.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p className="quote">"ExamMaster helped me pass my certification on the first try. The practice tests were spot on!"</p>
            <div className="user">
              <div className="avatar">JS</div>
              <div className="user-info">
                <div className="name">John Smith</div>
                <div className="title">AWS Certified Developer</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="quote">"The detailed analytics showed me exactly where to focus my studies. Highly recommended!"</p>
            <div className="user">
              <div className="avatar">MP</div>
              <div className="user-info">
                <div className="name">Maria Perez</div>
                <div className="title">Google Cloud Architect</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-item">
          <div className="stat-value">10,000+</div>
          <div className="stat-label">Practice Questions</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">98%</div>
          <div className="stat-label">Pass Rate</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">50+</div>
          <div className="stat-label">Exam Categories</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">150K</div>
          <div className="stat-label">Active Users</div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Ace Your Next Exam?</h2>
        <p>Join thousands of successful students today</p>
        <Link href="/pages/exams_list" className="cta-button large">Start Learning Now</Link>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">ExamMaster</div>
          <div className="footer-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">FAQ</Link>
          </div>
          <div className="social-links">
            <Link href="#">FB</Link>
            <Link href="#">TW</Link>
            <Link href="#">IG</Link>
            <Link href="#">LI</Link>
          </div>
        </div>
        <div className="copyright">© 2023 ExamMaster. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default HomePage;