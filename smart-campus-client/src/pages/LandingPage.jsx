import { Link } from "react-router-dom";
import "./LandingPage.css"; // We will create this file next for custom animations

function LandingPage() {
  return (
    <div className="landing-wrapper bg-light min-vh-100 d-flex flex-column justify-content-between">
      
      {/* Navigation Header Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-uppercase tracking-wider" to="/">
            <i className="bi bi-shield-exclamation text-warning fs-3"></i>
            Campus Voice
          </Link>
          <div className="d-flex gap-3">
            <Link to="/login" className="btn btn-outline-light btn-animated px-4">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-warning btn-animated fw-bold px-4 shadow-sm">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section Container */}
      <header className="container my-5 py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start animate-fade-in">
            <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill fw-bold text-uppercase tracking-wide">
              Official Grievance Portal
            </span>
            <h1 className="display-4 fw-extrabold text-dark mb-3 lh-sm">
              Your Voice Matters. <br />
              <span className="text-primary">We Are Listening.</span>
            </h1>
            <p className="lead text-secondary mb-4 py-1">
              Welcome to the centralized Campus Complaint Management System. A transparent, fast, and highly reliable platform designed for students to raise issues and track resolutions seamlessly in real-time.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              <Link to="/login" className="btn btn-primary btn-lg btn-animated px-5 py-3 shadow border-0 fw-bold">
                Get Started <i className="bi bi-arrow-right ms-2"></i>
              </Link>
              <a href="#features" className="btn btn-outline-secondary btn-lg btn-animated px-4 py-3">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="col-lg-6 text-center animate-bounce-slow">
            {/* Using high-quality placeholder system graphics */}
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600" 
              alt="Students collaborating on system" 
              className="img-fluid rounded-4 shadow-lg border border-white border-4 main-hero-img"
            />
          </div>
        </div>
      </header>

      {/* Quick Core Statistics Dashboard Banner */}
      <section className="bg-white py-5 shadow-sm border-top border-bottom">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <h2 className="fw-bold text-primary mb-1">100%</h2>
              <p className="text-muted uppercase small tracking-widest mb-0">Transparent System</p>
            </div>
            <div className="col-md-4 border-start border-end border-md-none">
              <h2 className="fw-bold text-success mb-1">&lt; 24h</h2>
              <p className="text-muted uppercase small tracking-widest mb-0">Average Response Time</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold text-warning mb-1">Real-Time</h2>
              <p className="text-muted uppercase small tracking-widest mb-0">Live Tracking Dashboards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Features Grid Blocks */}
      <section id="features" className="container my-5 py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">How It Works</h2>
          <p className="text-muted">A streamlined framework engineered to address institutional bottlenecks rapidly</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm card-hover-effect">
              <div className="card-body text-center d-flex flex-column align-items-center">
                <div className="icon-box bg-primary-subtle text-primary mb-4 rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-pencil-square fs-3"></i>
                </div>
                <h5 className="card-title fw-bold mb-3">1. Submit Grievance</h5>
                <p className="card-text text-muted small">
                  File technical, administrative, or hostel management complaints securely via your personalized student account profile.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm card-hover-effect">
              <div className="card-body text-center d-flex flex-column align-items-center">
                <div className="icon-box bg-info-subtle text-info mb-4 rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-gear-wide-connected fs-3"></i>
                </div>
                <h5 className="card-title fw-bold mb-3">2. Admin Processing</h5>
                <p className="card-text text-muted small">
                  Administrators instantly review new arrivals on their dedicated workstation feed, dispatching engineers or agents immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm card-hover-effect">
              <div className="card-body text-center d-flex flex-column align-items-center">
                <div className="icon-box bg-success-subtle text-success mb-4 rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-check2-circle fs-3"></i>
                </div>
                <h5 className="card-title fw-bold mb-3">3. Instant Resolution</h5>
                <p className="card-text text-muted small">
                  Receive live, color-coded tracking banner popups on your terminal dashboard the moment an issue flag changes state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Application Footer */}
      <footer className="bg-dark text-white text-center py-4 border-top border-secondary">
        <p className="mb-0 small text-secondary">&copy; Campus Voice Management Portal. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default LandingPage;