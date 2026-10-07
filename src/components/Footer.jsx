import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Compressly
          </Link>

          <p>
            Free, fast and privacy-friendly online image compression,
            conversion and resizing tools.
          </p>
        </div>

        {/* Image Tools */}
        <div className="footer-column">
          <h4>Image Tools</h4>

          <Link to="/jpg-compressor">
            JPG Image Compressor
          </Link>

          <Link to="/png-compressor">
            PNG Image Compressor
          </Link>

          <Link to="/webp-compressor">
            WebP Image Compressor
          </Link>

          <Link to="/jpg-to-webp">
            JPG to WebP Converter
          </Link>

          <Link to="/png-to-webp">
            PNG to WebP Converter
          </Link>

          <Link to="/image-resizer">
            Image Resizer
          </Link>

          <Link to="/compress-to-kb">
            Compress Image to Specific KB
          </Link>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h4>Company</h4>

          <Link to="/about">
            About Compressly
          </Link>

          <Link to="/contact">
            Contact Us
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