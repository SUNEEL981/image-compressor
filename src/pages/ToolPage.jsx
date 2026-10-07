import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {
  MAX_FILE_SIZE,
  formatBytes,
  reductionPercent,
  compressToTarget,
  createOutputFile,
} from "../utils/imageTools";

export default function ToolPage({
  title,
  description,
  accepted,
  inputLabel,
  outputType,
  outputName,
  note,
}) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [target, setTarget] = useState(100);
  const [customTarget, setCustomTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const targetKB = customTarget ? Number(customTarget) : target;

  function selectFile(selected) {
    if (!selected) return;

    setError("");
    setResult(null);

    if (selected.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 20 MB.");
      return;
    }

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    setFile(selected);

    const url = URL.createObjectURL(selected);
    setPreview(url);
  }

  async function compress() {
    if (!file) {
      setError(`Please select a ${inputLabel} image.`);
      return;
    }

    if (!targetKB || targetKB < 10 || targetKB > 10240) {
      setError("Target size must be between 10 KB and 10240 KB.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await compressToTarget(
        file,
        targetKB * 1024,
        outputType
      );

      const outputFile = createOutputFile(
        data.blob,
        file.name,
        outputType
      );

      setResult({
        ...data,
        file: outputFile,
        url: URL.createObjectURL(data.blob),
      });
    } catch (err) {
      setError(err.message || "Compression failed.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!result?.file) return;

    const url = URL.createObjectURL(result.file);
    const a = document.createElement("a");

    a.href = url;
    a.download = result.file.name;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError("");

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const saved = result
    ? reductionPercent(file.size, result.file.size)
    : 0;

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <span className="hero-badge">
            FREE ONLINE IMAGE TOOL
          </span>

          <h1>{title}</h1>

          <p>{description}</p>
        </section>

        <section className="upload-card">
          {!file ? (
            <div
              className="upload-area"
              onClick={() => inputRef.current?.click()}
            >
              <div className="upload-icon">↑</div>

              <h3>Upload {inputLabel} image</h3>

              <p>Maximum file size: 20 MB</p>

              <button className="upload-button">
                Choose Image
              </button>

              <input
                ref={inputRef}
                type="file"
                accept={accepted}
                hidden
                onChange={(e) =>
                  selectFile(e.target.files?.[0])
                }
              />
            </div>
          ) : (
            <>
              <div className="selected-file">
                <div>
                  <strong>{file.name}</strong>

                  <span>{formatBytes(file.size)}</span>
                </div>

                <button
                  className="remove-button"
                  onClick={reset}
                >
                  Remove
                </button>
              </div>

              <div className="settings-card">
                <div className="settings-header">
                  <div>
                    <h3>Target file size</h3>
                    <p>Try to compress below this size.</p>
                  </div>

                  <strong>{targetKB || 100} KB</strong>
                </div>

                <div className="target-options">
                  {[50, 100, 200, 500].map((size) => (
                    <button
                      key={size}
                      className={
                        !customTarget && target === size
                          ? "target-option active"
                          : "target-option"
                      }
                      onClick={() => {
                        setTarget(size);
                        setCustomTarget("");
                      }}
                    >
                      {size} KB
                    </button>
                  ))}

                  <input
                    className="custom-target"
                    type="number"
                    min="10"
                    max="10240"
                    placeholder="Custom KB"
                    value={customTarget}
                    onChange={(e) =>
                      setCustomTarget(e.target.value)
                    }
                  />
                </div>

                {note && (
                  <p className="target-note">{note}</p>
                )}
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button
                className="compress-button"
                onClick={compress}
                disabled={loading}
              >
                {loading
                  ? "Compressing..."
                  : `Compress ${inputLabel}`}
              </button>

              {result && (
                <>
                  <div className="preview-wrapper">
                    <div className="preview-box">
                      <span>Original</span>

                      <img
                        src={preview}
                        alt={`Original ${inputLabel} image`}
                      />

                      <p>{formatBytes(file.size)}</p>
                    </div>

                    <div className="preview-box">
                      <span>Compressed</span>

                      <img
                        src={result.url}
                        alt={`Compressed ${inputLabel} image`}
                      />

                      <p>
                        {formatBytes(result.file.size)}
                        {" • "}
                        {result.width} × {result.height}
                      </p>
                    </div>
                  </div>

                  <div className="compression-result">
                    <div>
                      <strong>
                        {formatBytes(result.file.size)}
                      </strong>
                      <span>Final size</span>
                    </div>

                    <div>
                      <strong>{saved.toFixed(0)}%</strong>
                      <span>Space saved</span>
                    </div>

                    <div>
                      <strong>{outputName.toUpperCase()}</strong>
                      <span>Output format</span>
                    </div>
                  </div>

                  <div
                    className={
                      result.achieved
                        ? "status success"
                        : "status warning"
                    }
                  >
                    {result.achieved
                      ? "✓ Target size achieved"
                      : "Target size could not be reached exactly. Best available result was generated."}
                  </div>

                  <div className="action-row">
                    <button
                      className="download-button"
                      onClick={download}
                    >
                      Download
                    </button>

                    <button
                      className="secondary-button"
                      onClick={reset}
                    >
                      Compress Another
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </section>

        {/* SEO Content */}
        <section className="privacy-section">
          <h2>Compress Images Online with Compressly</h2>

          <p>
            Compressly is a free online image compression tool that
            helps reduce image file size quickly. Choose your image,
            select a target size and download the compressed result.
          </p>

          <p>
            Image processing happens directly in your browser, so your
            images do not need to be uploaded to a server.
          </p>
        </section>

        {/* Related Tools */}
        <section className="privacy-section">
          <h2>More Image Tools</h2>

          <p>
            Looking for another image tool? Try one of these:
          </p>

          <div className="tool-grid">
            <Link to="/jpg-compressor" className="tool-card">
              <h3>JPG Image Compressor</h3>
              <p>
                Compress JPG and JPEG images online.
              </p>
            </Link>

            <Link to="/png-compressor" className="tool-card">
              <h3>PNG Image Compressor</h3>
              <p>
                Reduce PNG image file size online.
              </p>
            </Link>

            <Link to="/webp-compressor" className="tool-card">
              <h3>WebP Image Compressor</h3>
              <p>
                Compress WebP images while keeping good quality.
              </p>
            </Link>

            <Link to="/jpg-to-webp" className="tool-card">
              <h3>JPG to WebP Converter</h3>
              <p>
                Convert JPG images to WebP format.
              </p>
            </Link>

            <Link to="/png-to-webp" className="tool-card">
              <h3>PNG to WebP Converter</h3>
              <p>
                Convert PNG images to WebP.
              </p>
            </Link>

            <Link to="/image-resizer" className="tool-card">
              <h3>Image Resizer</h3>
              <p>
                Resize images to custom dimensions.
              </p>
            </Link>

            <Link to="/compress-to-kb" className="tool-card">
              <h3>Compress Image to Specific KB</h3>
              <p>
                Compress images to a target KB size.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}