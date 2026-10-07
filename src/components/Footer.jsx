import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Compressly
          </Link>

          <p>
            Simple, fast and privacy-friendly image tools.
          </p>
        </div>

        <div className="footer-column">
          <h4>Image Tools</h4>

          <Link to="/jpg-compressor">
            JPG Compressor
          </Link>

          <Link to="/png-compressor">
            PNG Compressor
          </Link>

          <Link to="/webp-compressor">
            WebP Compressor
          </Link>

          <Link to="/jpg-to-webp">
            JPG to WebP
          </Link>

          <Link to="/png-to-webp">
            PNG to WebP
          </Link>

          <Link to="/image-resizer">
            Image Resizer
          </Link>

          <Link to="/compress-to-kb">
            Compress to Specific KB
          </Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms of Use
          </Link>
        </div>

      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Compressly. All rights reserved.
        </span>
      </div>
    </footer>
  );
}