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
            Compress JPG, PNG and WebP images online for free.
            Reduce image file size quickly while keeping good image quality.
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
            <h3>JPG Image Compressor</h3>
            <p>
              Compress JPG and JPEG images online and reduce their file size.
            </p>
          </Link>

          <Link to="/png-compressor" className="tool-card">
            <h3>PNG Image Compressor</h3>
            <p>
              Compress PNG images online and reduce file size for web and sharing.
            </p>
          </Link>

          <Link to="/webp-compressor" className="tool-card">
            <h3>WebP Image Compressor</h3>
            <p>
              Compress WebP images while maintaining good visual quality.
            </p>
          </Link>

          <Link to="/jpg-to-webp" className="tool-card">
            <h3>JPG to WebP Converter</h3>
            <p>
              Convert JPG and JPEG images to the modern WebP format.
            </p>
          </Link>

          <Link to="/png-to-webp" className="tool-card">
            <h3>PNG to WebP Converter</h3>
            <p>
              Convert PNG images to smaller WebP files for faster websites.
            </p>
          </Link>

          <Link to="/image-resizer" className="tool-card">
            <h3>Image Resizer</h3>
            <p>
              Resize images to custom dimensions quickly and easily.
            </p>
          </Link>

          <Link to="/compress-to-kb" className="tool-card">
            <h3>Compress Image to Specific KB</h3>
            <p>
              Reduce an image to a target file size such as 50KB, 100KB or 200KB.
            </p>
          </Link>
        </section>

        <section className="privacy-section">
          <h2>Free and Privacy-Friendly Image Compression</h2>

          <p>
            Compressly provides free online tools for compressing,
            converting and resizing images. Image processing happens
            directly in your browser, so your images do not need to be
            uploaded to a server.
          </p>

          <p>
            Choose a tool above to compress JPG, PNG or WebP images,
            convert JPG or PNG to WebP, resize an image, or compress an
            image to a specific file size.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Popular Image Tools</h2>

          <p>
            Need a smaller JPG? Try our{" "}
            <Link to="/jpg-compressor">JPG Image Compressor</Link>.
            Working with PNG files? Use the{" "}
            <Link to="/png-compressor">PNG Image Compressor</Link>.
            For modern web images, try the{" "}
            <Link to="/webp-compressor">WebP Image Compressor</Link>.
          </p>

          <p>
            You can also{" "}
            <Link to="/jpg-to-webp">convert JPG to WebP</Link>,{" "}
            <Link to="/png-to-webp">convert PNG to WebP</Link>,{" "}
            <Link to="/image-resizer">resize images</Link>, or{" "}
            <Link to="/compress-to-kb">
              compress an image to a specific KB size
            </Link>.
          </p>
        </section>
      </main>
    </>
  );
}