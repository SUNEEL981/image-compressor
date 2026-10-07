import { useRef, useState } from "react";
import Header from "../components/Header";
import {
  MAX_FILE_SIZE,
  formatBytes,
  convertImage,
  createOutputFile,
} from "../utils/imageTools";

export default function ConvertPage({
  title,
  description,
  accepted,
  outputType,
  outputName,
  label,
}) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function selectFile(selected) {
    if (!selected) return;

    setError("");
    setResult(null);

    if (selected.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 20 MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function convert() {
    if (!file) {
      setError(`Please select a ${label} image.`);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await convertImage(
        file,
        outputType,
        0.85
      );

      const outputFile = createOutputFile(
        data.blob,
        file.name,
        outputType,
        "converted"
      );

      setResult({
        ...data,
        file: outputFile,
        url: URL.createObjectURL(data.blob),
      });
    } catch (err) {
      setError(
        err.message || "Conversion failed."
      );
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

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <span className="hero-badge">
            IMAGE CONVERTER
          </span>

          <h1>{title}</h1>

          <p>{description}</p>
        </section>

        <section className="upload-card">
          {!file ? (
            <div
              className="upload-area"
              onClick={() =>
                inputRef.current?.click()
              }
            >
              <div className="upload-icon">↑</div>

              <h3>
                Upload {label}
              </h3>

              <p>
                Maximum file size: 20 MB
              </p>

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
                  <span>
                    {formatBytes(file.size)}
                  </span>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {!result && (
                <button
                  className="compress-button"
                  onClick={convert}
                  disabled={loading}
                >
                  {loading
                    ? "Converting..."
                    : `Convert to ${outputName.toUpperCase()}`}
                </button>
              )}

              {result && (
                <>
                  <div className="preview-wrapper">
                    <div className="preview-box">
                      <span>Original</span>

                      <img
                        src={preview}
                        alt="Original"
                      />

                      <p>
                        {formatBytes(file.size)}
                      </p>
                    </div>

                    <div className="preview-box">
                      <span>
                        Converted {outputName.toUpperCase()}
                      </span>

                      <img
                        src={result.url}
                        alt="Converted"
                      />

                      <p>
                        {formatBytes(
                          result.file.size
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="action-row">
                    <button
                      className="download-button"
                      onClick={download}
                    >
                      Download {outputName.toUpperCase()}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}