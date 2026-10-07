import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JpgCompressor from "./pages/JpgCompressor";
import PngCompressor from "./pages/PngCompressor";
import WebpCompressor from "./pages/WebpCompressor";
import JpgToWebp from "./pages/JpgToWebp";
import PngToWebp from "./pages/PngToWebp";
import ImageResizer from "./pages/ImageResizer";
import CompressToKb from "./pages/CompressToKb";

import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

import Footer from "./components/Footer";
import SEO from "./components/SEO";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Free Online Image Compressor"
                  description="Compress JPG, PNG and WebP images online for free. Reduce image file size quickly with privacy-friendly browser-based compression."
                  path="/"
                />
                <Home />
              </>
            }
          />

          {/* JPG */}
          <Route
            path="/jpg-compressor"
            element={
              <>
                <SEO
                  title="JPG Compressor Online"
                  description="Compress JPG and JPEG images online for free. Reduce JPG file size while keeping good image quality."
                  path="/jpg-compressor"
                />
                <JpgCompressor />
              </>
            }
          />

          {/* PNG */}
          <Route
            path="/png-compressor"
            element={
              <>
                <SEO
                  title="PNG Compressor Online"
                  description="Compress PNG images online for free. Reduce PNG file size and convert images to smaller WebP files when needed."
                  path="/png-compressor"
                />
                <PngCompressor />
              </>
            }
          />

          {/* WEBP */}
          <Route
            path="/webp-compressor"
            element={
              <>
                <SEO
                  title="WebP Compressor Online"
                  description="Compress WebP images online for free and reduce image file size for faster websites and sharing."
                  path="/webp-compressor"
                />
                <WebpCompressor />
              </>
            }
          />

          {/* JPG TO WEBP */}
          <Route
            path="/jpg-to-webp"
            element={
              <>
                <SEO
                  title="JPG to WebP Converter"
                  description="Convert JPG and JPEG images to WebP online for free. Create smaller modern image files for websites and apps."
                  path="/jpg-to-webp"
                />
                <JpgToWebp />
              </>
            }
          />

          {/* PNG TO WEBP */}
          <Route
            path="/png-to-webp"
            element={
              <>
                <SEO
                  title="PNG to WebP Converter"
                  description="Convert PNG images to WebP online for free and create smaller image files for faster websites."
                  path="/png-to-webp"
                />
                <PngToWebp />
              </>
            }
          />

          {/* IMAGE RESIZER */}
          <Route
            path="/image-resizer"
            element={
              <>
                <SEO
                  title="Image Resizer Online"
                  description="Resize images online for free. Change image dimensions quickly and download your resized image."
                  path="/image-resizer"
                />
                <ImageResizer />
              </>
            }
          />

          {/* SPECIFIC KB */}
          <Route
            path="/compress-to-kb"
            element={
              <>
                <SEO
                  title="Compress Image to Specific KB"
                  description="Compress images to a specific file size such as 50 KB, 100 KB, 200 KB or 500 KB. Process multiple images online for free."
                  path="/compress-to-kb"
                />
                <CompressToKb />
              </>
            }
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={
              <>
                <SEO
                  title="About Compressly"
                  description="Learn about Compressly, a simple browser-based collection of image compression and conversion tools."
                  path="/about"
                />
                <About />
              </>
            }
          />

          {/* PRIVACY */}
          <Route
            path="/privacy-policy"
            element={
              <>
                <SEO
                  title="Privacy Policy"
                  description="Read the Compressly privacy policy and learn how image processing and website data are handled."
                  path="/privacy-policy"
                />
                <PrivacyPolicy />
              </>
            }
          />

          {/* TERMS */}
          <Route
            path="/terms"
            element={
              <>
                <SEO
                  title="Terms of Use"
                  description="Read the Compressly terms of use for using our online image compression and conversion tools."
                  path="/terms"
                />
                <Terms />
              </>
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={
              <>
                <SEO
                  title="Contact Compressly"
                  description="Contact Compressly for questions, feedback, suggestions or issues related to our image tools."
                  path="/contact"
                />
                <Contact />
              </>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <>
                <SEO
                  title="Page Not Found"
                  description="The page you are looking for could not be found."
                  path="/404"
                />
                <NotFound />
              </>
            }
          />

        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-card">
        <span className="not-found-code">404</span>

        <h1>Page not found</h1>

        <p>
          The page you are looking for doesn't exist or may
          have been moved.
        </p>

        <a href="/" className="not-found-button">
          Back to Home
        </a>
      </div>
    </main>
  );
}

export default App;