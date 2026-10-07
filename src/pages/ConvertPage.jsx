import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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
      setError(err.message || "Conversion failed.");
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

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* HERO */}
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gray-600 sm:text-xs">
            IMAGE CONVERTER
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            {description}
          </p>
        </section>

        {/* UPLOAD / CONVERSION CARD */}
        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:mt-10 sm:rounded-3xl sm:p-6 md:p-8">
          {!file ? (
            <div
              className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/70 px-4 py-10 text-center transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 sm:min-h-[320px] sm:px-8"
              onClick={() => inputRef.current?.click()}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-2xl font-bold text-white shadow-sm sm:h-16 sm:w-16">
                ↑
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-950 sm:text-xl">
                Upload {label}
              </h3>

              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Maximum file size: 20 MB
              </p>

              <button
                type="button"
                className="mt-5 inline-flex min-h-[46px] w-full max-w-[220px] items-center justify-center rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.98]"
              >
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
              {/* SELECTED FILE */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <strong className="min-w-0 break-all text-sm font-bold text-gray-900 sm:text-base">
                    {file.name}
                  </strong>

                  <span className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm">
                    {formatBytes(file.size)}
                  </span>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                  {error}
                </div>
              )}

              {/* CONVERT BUTTON */}
              {!result && (
                <button
                  type="button"
                  className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6"
                  onClick={convert}
                  disabled={loading}
                >
                  {loading
                    ? "Converting..."
                    : `Convert to ${outputName.toUpperCase()}`}
                </button>
              )}

              {/* RESULT */}
              {result && (
                <>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                    {/* ORIGINAL */}
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                          Original
                        </span>

                        <span className="shrink-0 text-xs font-medium text-gray-400">
                          {formatBytes(file.size)}
                        </span>
                      </div>

                      <div className="mt-4 flex h-[220px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3 sm:h-[260px]">
                        <img
                          src={preview}
                          alt={`Original ${label} image`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <p className="mt-3 break-all text-xs leading-5 text-gray-500">
                        {formatBytes(file.size)}
                      </p>
                    </div>

                    {/* CONVERTED */}
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="min-w-0 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Converted {outputName.toUpperCase()}
                        </span>

                        <span className="shrink-0 text-xs font-medium text-gray-400">
                          {formatBytes(result.file.size)}
                        </span>
                      </div>

                      <div className="mt-4 flex h-[220px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3 sm:h-[260px]">
                        <img
                          src={result.url}
                          alt={`Converted ${outputName.toUpperCase()} image`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <p className="mt-3 break-all text-xs leading-5 text-gray-500">
                        {formatBytes(result.file.size)}
                      </p>
                    </div>
                  </div>

                  {/* DOWNLOAD */}
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.98]"
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

        {/* PRIVACY / INFO */}
        <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:mt-12 sm:p-7 md:p-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            Convert Images to WebP Online
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
            WebP can be useful for websites because it can
            provide smaller image files while maintaining
            good visual quality. Convert your image directly
            in the browser without uploading it to a server.
          </p>
        </section>

        {/* RELATED TOOLS */}
        <section className="mx-auto mt-10 max-w-4xl sm:mt-12">
          <h2 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            Related Image Tools
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/jpg-to-webp"
              className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-bold text-gray-950">
                    JPG to WebP Converter
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    Convert JPG and JPEG images to WebP.
                  </p>
                </div>

                <span className="shrink-0 text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

            <Link
              to="/png-to-webp"
              className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-bold text-gray-950">
                    PNG to WebP Converter
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    Convert PNG images to WebP.
                  </p>
                </div>

                <span className="shrink-0 text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

            <Link
              to="/webp-compressor"
              className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-bold text-gray-950">
                    WebP Image Compressor
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    Reduce the size of WebP images.
                  </p>
                </div>

                <span className="shrink-0 text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

            <Link
              to="/image-resizer"
              className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-bold text-gray-950">
                    Image Resizer
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    Resize images to custom dimensions.
                  </p>
                </div>

                <span className="shrink-0 text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

            <Link
              to="/compress-to-kb"
              className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:col-span-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-bold text-gray-950">
                    Compress Image to Specific KB
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    Compress images to a target file size.
                  </p>
                </div>

                <span className="shrink-0 text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}