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

      <main className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">

          {/* ================= HERO ================= */}
          <section className="mx-auto max-w-3xl pb-8 pt-12 text-center sm:pb-10 sm:pt-16 lg:pt-20">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Image Resizer
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-1.8px] text-gray-950 sm:text-5xl lg:text-[58px]">
              Resize Images
              <br />
              <span className="text-gray-500">to Any Dimension</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Resize JPG, PNG and WebP images to custom width and
              height while keeping your preferred aspect ratio.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-gray-400 sm:text-xs">
              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                JPG
              </span>

              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                PNG
              </span>

              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                WebP
              </span>

              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                Custom Dimensions
              </span>
            </div>
          </section>

          {/* ================= MAIN TOOL ================= */}
          <section className="mx-auto mb-14 w-full max-w-4xl rounded-[26px] border border-gray-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-4 lg:p-5">

            {!file ? (
              /* ================= UPLOAD STATE ================= */
              <div
                className="group flex min-h-[380px] cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-gray-200 bg-gray-50/50 px-5 text-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                onClick={() => inputRef.current?.click()}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white text-2xl font-light text-gray-700 shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
                  ↑
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-[-0.4px] text-gray-950">
                  Upload an image
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Choose a JPG, PNG or WebP image to start resizing.
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.98]"
                >
                  Choose Image
                </button>

                <p className="mt-4 text-[11px] text-gray-400">
                  Your image is processed directly in your browser.
                </p>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) =>
                    selectFile(e.target.files?.[0])
                  }
                />
              </div>
            ) : (
              <>
                {/* ================= FILE HEADER ================= */}
                <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-gray-700 shadow-sm">
                      IMG
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {file.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Original size: {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview("");
                      setResult(null);
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-500 transition hover:border-gray-300 hover:text-gray-900"
                  >
                    Change Image
                  </button>
                </div>

                {/* ================= SETTINGS ================= */}
                <div className="rounded-[20px] border border-gray-200 bg-gray-50/70 p-5 sm:p-6 lg:p-7">

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
                          1
                        </span>

                        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">
                          Resize Settings
                        </span>
                      </div>

                      <h2 className="text-xl font-bold tracking-[-0.5px] text-gray-950 sm:text-2xl">
                        Set image dimensions
                      </h2>

                      <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
                        Enter your desired width and height in pixels.
                      </p>
                    </div>

                    <div className="hidden rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-500 sm:block">
                      Pixels (px)
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">

                    <div>
                      <label
                        htmlFor="resize-width"
                        className="mb-2 block text-xs font-semibold text-gray-600"
                      >
                        Width
                      </label>

                      <div className="flex h-12 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5">
                        <input
                          id="resize-width"
                          type="number"
                          min="1"
                          placeholder="Width"
                          value={width}
                          onChange={(e) =>
                            changeWidth(e.target.value)
                          }
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                        />

                        <span className="flex items-center border-l border-gray-100 px-4 text-xs font-bold text-gray-400">
                          px
                        </span>
                      </div>
                    </div>

                    <div className="hidden h-12 items-center justify-center text-lg font-medium text-gray-300 sm:flex">
                      ×
                    </div>

                    <div>
                      <label
                        htmlFor="resize-height"
                        className="mb-2 block text-xs font-semibold text-gray-600"
                      >
                        Height
                      </label>

                      <div className="flex h-12 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5">
                        <input
                          id="resize-height"
                          type="number"
                          min="1"
                          placeholder="Height"
                          value={height}
                          onChange={(e) =>
                            changeHeight(e.target.value)
                          }
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                        />

                        <span className="flex items-center border-l border-gray-100 px-4 text-xs font-bold text-gray-400">
                          px
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Aspect Ratio */}
                  <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3.5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-sm">
                        {lock ? "🔒" : "↔"}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-800">
                          Aspect ratio
                        </p>

                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {lock
                            ? "Width and height stay proportional."
                            : "Width and height can change independently."}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLock(!lock)}
                      className={`
                        rounded-lg px-4 py-2 text-xs font-bold transition-all
                        ${
                          lock
                            ? "bg-gray-950 text-white"
                            : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                        }
                      `}
                    >
                      {lock ? "Locked" : "Unlocked"}
                    </button>
                  </div>

                  {/* Current dimensions */}
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
                    <span className="text-xs font-medium text-gray-500">
                      New dimensions
                    </span>

                    <strong className="text-sm font-extrabold text-gray-950">
                      {width} × {height} px
                    </strong>
                  </div>
                </div>

                {/* ================= RESIZE ACTION ================= */}
                <div className="mt-5">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.99]"
                    onClick={resize}
                  >
                    Resize Image
                  </button>
                </div>

                {/* ================= RESULT ================= */}
                {result && (
                  <div className="mt-6">

                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-100" />

                      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">
                        Result
                      </span>

                      <div className="h-px flex-1 bg-gray-100" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* Original */}
                      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-700">
                            Original
                          </span>

                          <span className="text-[11px] font-medium text-gray-400">
                            {formatBytes(file.size)}
                          </span>
                        </div>

                        <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3">
                          <img
                            src={preview}
                            alt="Original image"
                            className="max-h-[220px] max-w-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Resized */}
                      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-700">
                            Resized
                          </span>

                          <span className="text-[11px] font-medium text-gray-400">
                            {formatBytes(result.size)}
                          </span>
                        </div>

                        <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3">
                          <img
                            src={result.url}
                            alt="Resized image"
                            className="max-h-[220px] max-w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-5 w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.99]"
                      onClick={download}
                    >
                      Download Resized Image
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          {/* ================= INFORMATION ================= */}
          <section className="mx-auto mb-10 w-full max-w-4xl rounded-2xl border border-gray-200 bg-gray-50/60 p-5 sm:p-7">

            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-gray-900 shadow-sm">
                ✓
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-[-0.3px] text-gray-950 sm:text-xl">
                  Resize Images for Different Uses
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Quickly prepare images for websites, social media,
                  documents and online forms.
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-gray-500">
              Resize images to custom width and height values for
              websites, social media, documents and online forms.
              The aspect-ratio lock helps keep image proportions
              consistent.
            </p>
          </section>

          {/* ================= RELATED TOOLS ================= */}
          <section className="mx-auto mb-16 w-full max-w-4xl">

            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
                More tools
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.5px] text-gray-950 sm:text-2xl">
                More Image Tools
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <Link
                to="/jpg-compressor"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[10px] font-extrabold text-gray-700">
                    JPG
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  JPG Image Compressor
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Reduce JPG and JPEG image file size.
                </p>
              </Link>

              <Link
                to="/png-compressor"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[10px] font-extrabold text-gray-700">
                    PNG
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  PNG Image Compressor
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Compress PNG images online.
                </p>
              </Link>

              <Link
                to="/webp-compressor"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[10px] font-extrabold text-gray-700">
                    WEBP
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  WebP Image Compressor
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Reduce WebP image file size.
                </p>
              </Link>

              <Link
                to="/compress-to-kb"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[9px] font-extrabold text-gray-700">
                    KB
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  Compress Image to Specific KB
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Target a specific image file size.
                </p>
              </Link>

            </div>
          </section>
        </div>
      </main>
    </>
  );
}