import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {
  loadImage,
  formatBytes,
} from "../utils/imageTools";

export default function ImageResizer() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [result, setResult] = useState(null);

  async function selectFile(selected) {
    if (!selected) return;

    const data = await loadImage(selected);

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setWidth(data.width);
    setHeight(data.height);
    setRatio(data.width / data.height);
    setResult(null);
  }

  function changeWidth(value) {
    setWidth(value);

    if (lock && value) {
      setHeight(Math.round(Number(value) / ratio));
    }
  }

  function changeHeight(value) {
    setHeight(value);

    if (lock && value) {
      setWidth(Math.round(Number(value) * ratio));
    }
  }

  async function resize() {
    if (!file || !width || !height) return;

    const image = await loadImage(file);

    const canvas = document.createElement("canvas");

    canvas.width = Number(width);
    canvas.height = Number(height);

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image.image,
      0,
      0,
      Number(width),
      Number(height)
    );

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9)
    );

    const url = URL.createObjectURL(blob);

    setResult({
      blob,
      url,
      size: blob.size,
    });
  }

  function download() {
    if (!result) return;

    const a = document.createElement("a");

    a.href = result.url;
    a.download = "resized-image.jpg";

    a.click();
  }

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <span className="hero-badge">
            IMAGE RESIZER
          </span>

          <h1>Resize Images Online</h1>

          <p>
            Resize JPG, PNG and WebP images to custom
            dimensions while keeping the original aspect ratio.
          </p>
        </section>

        <section className="upload-card">
          {!file ? (
            <div
              className="upload-area"
              onClick={() => inputRef.current?.click()}
            >
              <div className="upload-icon">↑</div>

              <h3>Upload image</h3>

              <p>JPG, PNG or WebP</p>

              <button className="upload-button">
                Choose Image
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  selectFile(e.target.files?.[0])
                }
              />
            </div>
          ) : (
            <>
              <div className="settings-card">
                <h3>Image dimensions</h3>

                <div className="target-options">
                  <input
                    className="custom-target"
                    type="number"
                    placeholder="Width"
                    value={width}
                    onChange={(e) =>
                      changeWidth(e.target.value)
                    }
                  />

                  <span>×</span>

                  <input
                    className="custom-target"
                    type="number"
                    placeholder="Height"
                    value={height}
                    onChange={(e) =>
                      changeHeight(e.target.value)
                    }
                  />

                  <button
                    className={
                      lock
                        ? "target-option active"
                        : "target-option"
                    }
                    onClick={() => setLock(!lock)}
                  >
                    {lock ? "🔒 Locked" : "🔓 Unlock"}
                  </button>
                </div>
              </div>

              <button
                className="compress-button"
                onClick={resize}
              >
                Resize Image
              </button>

              {result && (
                <>
                  <div className="preview-wrapper">
                    <div className="preview-box">
                      <span>Original</span>

                      <img
                        src={preview}
                        alt="Original image"
                      />

                      <p>{formatBytes(file.size)}</p>
                    </div>

                    <div className="preview-box">
                      <span>Resized</span>

                      <img
                        src={result.url}
                        alt="Resized image"
                      />

                      <p>{formatBytes(result.size)}</p>
                    </div>
                  </div>

                  <button
                    className="download-button"
                    onClick={download}
                  >
                    Download Resized Image
                  </button>
                </>
              )}
            </>
          )}
        </section>

        <section className="privacy-section">
          <h2>Resize Images for Different Uses</h2>

          <p>
            Resize images to custom width and height values for
            websites, social media, documents and online forms.
            The aspect-ratio lock helps keep image proportions consistent.
          </p>
        </section>

        <section className="privacy-section">
          <h2>More Image Tools</h2>

          <div className="tool-grid">
            <Link to="/jpg-compressor" className="tool-card">
              <h3>JPG Image Compressor</h3>
              <p>Reduce JPG and JPEG image file size.</p>
            </Link>

            <Link to="/png-compressor" className="tool-card">
              <h3>PNG Image Compressor</h3>
              <p>Compress PNG images online.</p>
            </Link>

            <Link to="/webp-compressor" className="tool-card">
              <h3>WebP Image Compressor</h3>
              <p>Reduce WebP image file size.</p>
            </Link>

            <Link to="/compress-to-kb" className="tool-card">
              <h3>Compress Image to Specific KB</h3>
              <p>Target a specific image file size.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}