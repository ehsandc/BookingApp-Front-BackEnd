import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-links-grid">
        <div className="footer-topic">
          <div className="footer-topic-title">Stays</div>
          <a href="/stays">Stays</a>
          <a href="/list-property">List Your Property</a>
          <a href="#properties">Properties</a>
        </div>
        <div className="footer-topic">
          <div className="footer-topic-title">Flights</div>
          <a href="/flights">Flights</a>
          <a href="/flight-stay">Flight + Stay</a>
          <a href="/car-rental">Car Rental</a>
          <a href="/taxis">Taxis</a>
        </div>
        <div className="footer-topic">
          <div className="footer-topic-title">Services</div>
          <a href="/attractions">Attractions</a>
          <a href="/search">Search</a>
        </div>
        <div className="footer-topic">
          <div className="footer-topic-title">Support</div>
          <a href="/help">Help</a>
          <a href="/about">About Us</a>
          <a href="mailto:support@bookingapp.com">Contact</a>
        </div>
        <div className="footer-topic">
          <div className="footer-topic-title">Account</div>
          <a href="/dashboard">Dashboard</a>
          <a href="/login">Login</a>
          <a href="/logout">Logout</a>
        </div>
      </div>
      <div className="footer-social footer-social-center">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <span role="img" aria-label="Twitter">
            🐦
          </span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <span role="img" aria-label="Instagram">
            📸
          </span>
        </a>
      </div>
      <div
        className="footer-brand"
        style={{
          marginTop: "2.5rem",
          width: "100%",
          textAlign: "center",
          fontSize: "1.08rem",
          opacity: 0.85,
        }}
      >
        BookingApp &copy; {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
