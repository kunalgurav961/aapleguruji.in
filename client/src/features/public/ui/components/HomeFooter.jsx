import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";

const HomeFooter = () => (
  <footer className="home-footer">
    <div className="home-container">
      <div className="footer-columns">
        <div className="footer-about">
          <Link aria-label="Aaple Guruji home" to="/">
            <img alt="Aaple Guruji" src={logo} />
          </Link>
          <p>
            Maharashtra&apos;s premier spiritual technology bridge delivering
            authentic Vedic traditions, verified certified Pandits, and
            consecrated ritual samagri straight to your sacred household.
          </p>
        </div>
        <div className="footer-link-column">
          <h3>Puja Services</h3>
          <Link to="/pooja">Griha Pravesh</Link>
          <Link to="/pooja">Satyanarayan</Link>
          <Link to="/pooja">Ganesh Puja</Link>
          <Link to="/pooja">Vastu Shanti</Link>
          <Link to="/pooja">Navgraha Puja</Link>
        </div>
        <div className="footer-link-column">
          <h3>Quick Links</h3>
          <Link to="/about">About Us</Link>
          <Link to="/about#our-values">Verified Pandits</Link>
          <Link to="/about#our-values">Customer Reviews</Link>
          <Link to="/about">FAQs</Link>
        </div>
        <div className="footer-link-column">
          <h3>Spiritual Resources</h3>
          <Link to="/blogs">Auspicious Muhurats</Link>
          <Link to="/blogs">Hindu Calendar</Link>
          <Link to="/blogs">Puja Samagri List</Link>
          <Link to="/blogs">Blog</Link>
          <div className="footer-contact">
            <span>Support &amp; Inquiries</span>
            <a href="tel:+918888333430">+91 8888333430</a>
            <a href="mailto:support@aapleguruji.com">
              support@aapleguruji.com
            </a>
            <span>Pune • Mumbai • Thane</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2025 Aaple Guruji. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/about">Privacy Policy</Link>
          <Link to="/about">Terms of Service</Link>
        </div>
        <div className="footer-socials" aria-label="Social media">
          <a aria-label="Facebook" href="#home">f</a>
          <a aria-label="Instagram" href="#home">◎</a>
          <a aria-label="YouTube" href="#home">▶</a>
          <a aria-label="WhatsApp" href="https://wa.me/918888333430">◉</a>
        </div>
      </div>
    </div>
  </footer>
);

export default HomeFooter;
