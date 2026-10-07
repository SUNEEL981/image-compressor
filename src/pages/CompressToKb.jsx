import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import MultiImageCompressor from "../components/MultiImageCompressor";

const TARGET_OPTIONS = [50, 100, 200, 500];

export default function CompressToKb() {
  const [targetSize, setTargetSize] = useState(100);
  const [customSize, setCustomSize] = useState("");

  const selectedTarget = customSize
    ? Math.min(
        Math.max(Number(customSize) || 100, 10),
        10240
      )
    : targetSize;

  const handlePreset = (size) => {
    setTargetSize(size);
    setCustomSize("");
  };

  const handleCustom = (event) => {
    const value = event.target.value;

    if (value === "") {
      setCustomSize("");
      return;
    }

    const numericValue = Number(value);

    if (numericValue >= 10 && numericValue <= 10240) {
      setCustomSize(value);
    }
  };

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <span className="hero-badge">
            TARGET SIZE COMPRESSOR
          </span>

          <h1>Compress Images to Specific KB</h1>

          <p>
            Compress one or multiple JPG, PNG or WebP images
            to a target file size such as 50 KB, 100 KB,
            200 KB or 500 KB.
          </p>
        </section>

        <section className="upload-card">
          <div className="target-size-panel">
            <div className="target-size-heading">
              <h2>Choose Target Size</h2>

              <p>
                Select the maximum file size for your compressed images.
              </p>
            </div>

            <div className="target-options">
              {TARGET_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`target-option ${
                    !customSize && targetSize === size
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handlePreset(size)}
                >
                  {size} KB
                </button>
              ))}
            </div>

            <div className="custom-size-section">
              <label htmlFor="custom-target">
                Custom size
              </label>

              <div className="custom-target">
                <input
                  id="custom-target"
                  type="number"
                  min="10"
                  max="10240"
                  placeholder="Enter size"
                  value={customSize}
                  onChange={handleCustom}
                />

                <span>KB</span>
              </div>
            </div>

            <div className="selected-target-box">
              <span>Target size</span>

              <strong>{selectedTarget} KB</strong>
            </div>

            <p className="target-note">
              Minimum <strong>10 KB</strong> · Maximum{" "}
              <strong>10 MB</strong>
            </p>
          </div>

          <MultiImageCompressor
            accepted="image/jpeg,image/png,image/webp"
            targetSize={selectedTarget}
            outputType="image/webp"
            title="Upload Multiple Images"
          />
        </section>

        <section className="privacy-section">
          <h2>Compress Images to 50KB, 100KB, 200KB or 500KB</h2>

          <p>
            Use Compressly when you need an image below a
            specific file-size limit. Choose a preset target
            or enter a custom size between 10 KB and 10 MB.
          </p>

          <p>
            You can process multiple JPG, PNG and WebP images
            in one session and download the compressed results.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Other Image Tools</h2>

          <div className="tool-grid">
            <Link to="/jpg-compressor" className="tool-card">
              <h3>JPG Image Compressor</h3>
              <p>Compress JPG and JPEG images.</p>
            </Link>

            <Link to="/png-compressor" className="tool-card">
              <h3>PNG Image Compressor</h3>
              <p>Reduce PNG image file size.</p>
            </Link>

            <Link to="/webp-compressor" className="tool-card">
              <h3>WebP Image Compressor</h3>
              <p>Compress WebP images online.</p>
            </Link>

            <Link to="/image-resizer" className="tool-card">
              <h3>Image Resizer</h3>
              <p>Resize images to custom dimensions.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}