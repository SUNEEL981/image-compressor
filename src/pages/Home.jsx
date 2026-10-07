import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <span className="hero-badge">
            FREE ONLINE IMAGE TOOLS
          </span>

          <h1>Compress Images Online</h1>

          <p>
            Reduce image file size without unnecessary quality loss.
            Fast, simple and privacy-friendly.
          </p>

          <Link
            to="/compress-to-kb"
            className="upload-button hero-button"
          >
            Start Compressing
          </Link>
        </section>

        <section className="tool-grid">
          <Link to="/jpg-compressor" className="tool-card">
            <h3>JPG Compressor</h3>
            <p>
              Compress JPG and JPEG images to a smaller size.
            </p>
          </Link>

          <Link to="/png-compressor" className="tool-card">
            <h3>PNG Compressor</h3>
            <p>
              Optimize PNG images for web and sharing.
            </p>
          </Link>

          <Link to="/webp-compressor" className="tool-card">
            <h3>WebP Compressor</h3>
            <p>
              Reduce WebP image size while keeping good quality.
            </p>
          </Link>

          <Link to="/jpg-to-webp" className="tool-card">
            <h3>JPG to WebP</h3>
            <p>
              Convert JPG images to modern WebP format.
            </p>
          </Link>

          <Link to="/png-to-webp" className="tool-card">
            <h3>PNG to WebP</h3>
            <p>
              Convert PNG images to smaller WebP files.
            </p>
          </Link>

          <Link to="/image-resizer" className="tool-card">
            <h3>Image Resizer</h3>
            <p>
              Resize images to custom dimensions.
            </p>
          </Link>
        </section>

        <section className="privacy-section">
          <h2>Your images stay private</h2>

          <p>
            Image processing happens directly in your browser.
            Your images do not need to be uploaded to a server.
          </p>
        </section>
      </main>
    </>
  );
}